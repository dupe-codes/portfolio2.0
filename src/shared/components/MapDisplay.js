import React from 'react';
import { mapboxAPIToken, mapboxMapID } from '../../client/clientConfig';

export default class MapDisplay extends React.Component {
  constructor() {
    super();

    // Bind 'this' to component functions
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // Initialize map after the component has been mounted
  componentDidMount() {
    console.log(mapboxAPIToken);
    console.log(mapboxMapID);
    L.mapbox.accessToken = mapboxAPIToken;
    this.map = L.mapbox.map('apiMap', mapboxMapID);
  }

  render() {
    return (
      <div className="row">
        <div className="small-11 small-centered columns">
          <div id='apiMap' style={{position:'relative',top:30,bottom:0,width:'100%',height:500}}>
          </div>
        </div>
      </div>
    );
  }
}
