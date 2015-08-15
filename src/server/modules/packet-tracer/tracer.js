'use strict';

/*
 * Module for grabbing the rough geolocation path followed
 * by packets going from the running host machine to a
 * destination IP address
 *
 * Author: @njdup
 */

import readline from 'readline';
import request from 'request';
import async from 'async';

import { spawn } from 'child_process';
import { format } from 'util';

import { ipInfoKey } from '../../../config'; //TODO: Figure out less ugly import
const ipAddrRegex = /\(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\)/;
const ipApiUrl = 'http://api.ipinfodb.com/v3/ip-city/?key=' + ipInfoKey + '&ip=%s&format=json';

export function getPacketPath(destIP, callback) {
  // Spawn traceroute process to get route to destIP
  // TODO: Figure out what args to pass in to speed up traceroute
  let traceArgs = ['-w 1', '-q 1', '-m 24', destIP];
  let process = spawn('traceroute', traceArgs);

  // create callback to catch traceroute stdout, line by line
  let output = [];
  readline.createInterface({
    input: process.stdout,
    terminal: false
  }).on('line', function(line) {
    output.push(line);
  });

  process.on('close', function traceDone(retCode) {
    if (retCode !== 0) {
      callback('', new Error('Traceroute failed'));
      return;
    }

    // Extract IP addresses from traceroute output
    let ipAddrs = [];
    for (let i = 0; i < output.length; i++) {
      try {
        let extracted = extractIPAddress(output[i]);
        ipAddrs.push(extracted);
      } catch (error) {
        // Do nothing
      }
    }

    // Now grab location info for the ip addrs
    getIpLocations(ipAddrs, callback);
  });
}

/*
 * -----------------
 * Private Functions
 * -----------------
 */

function extractIPAddress(tracerouteLine) {
  let matches = ipAddrRegex.exec(tracerouteLine);
  if (!matches) {throw new Error('No IP address found in the given line');}
  return matches[1];
}

function getIpLocations(ipAddrs, callback) {
  let responses = [];
  async.each(ipAddrs, function getLocations(ip, cb) {
    request.get(format(ipApiUrl, ip), function apiResponse(err, res, body) {
      if (err) {console.log('Some error occurred fetching IP info');}
      responses.push(body);
      cb(); // Alert async that this request is done
    });
  },
  function requestsDone(err) {
    let locations = responses.map(function(item) {
      item = JSON.parse(item);
      return {
        ipAddr: item.ipAddress,
        city: item.cityName,
        latitude: item.latitude,
        longitude: item.longitude
      };
    });

    // Sort locations back into original path ordering
    locations.sort(function(a, b) {
      return ipAddrs.indexOf(a.ipAddr) - ipAddrs.indexOf(b.ipAddr);
    });
    callback(locations, err);
  });
}
