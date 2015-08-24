import React from 'react';
import { MapRouteStore } from '../stores/MapRouteStore';
import { mapboxAPIToken, mapboxMapID } from '../../client/clientConfig';

export default class MapDisplay extends React.Component {
  constructor() {
    super();

    this.state = {
      route: []
    }

    // Bind 'this' to component functions
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onRouteReceived = this.onRouteReceived.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  onRouteReceived(route) {
    console.log('Plotting a route...');
    console.log(route);
    route.splice(0, 1); // TODO: Get rid of this, only relevant when dealing w/ localhost
    var polyline_options = {
        color: '#FBB829'
    };
    console.log(this.map);
    this.plottedRoute = L.polyline(route, polyline_options).addTo(this.map);

    this.setState({
      route: route
    });
  }

  // Initialize map after the component has been mounted
  componentDidMount() {
    L.mapbox.accessToken = mapboxAPIToken;
    this.map = L.mapbox.map('apiMap', mapboxMapID);

    this.unsubscribe = MapRouteStore.listen(this.onRouteReceived);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="row" style={{left:'5%', right:'5%', 'max-width': 1400}}>
        <div className="small-11 small-centered columns">
          <div id='apiMap' style={{position:'relative',top:30,bottom:5,width:'100%',height:500}}>
          </div>
        </div>
      </div>
    );
  }
}
