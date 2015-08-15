'use strict';

/*
 * API definition for grabbing (rough) information
 * about the path packets take from the running host
 * to a client
 */

import { Router } from 'express';
import { getPacketPath } from '../modules/packet-tracer/tracer';

let router = new Router();

// TODO: Add caching of path to specific IP
router.get('/', function(req, res) {
  let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  clientIP = '170.149.100.10'; // New York Times in NY, NY
  //clientIP = '74.125.224.72' // Google in MV, CA
  getPacketPath(clientIP, function (packetPath, err) {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.json(packetPath);
    }
  });
});

export default router;
