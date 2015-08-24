import React from 'react';
import { Actions } from '../stores/APIDataStore';
import { addRoute } from '../stores/MapRouteStore';

export default class APIButton extends React.Component {
  constructor() {
    super();

    // Bind 'this' to component functions
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(event) {
    console.log('Fetching data from ' + this.props.endpoint.url);

    // First trace route to client
    $.get('/tracing', (result) => {
      console.log(result);
      let routeLines = result.map(function(location) {
        return [Number(location.latitude), Number(location.longitude)];
      });

      addRoute(routeLines);

      // Then get and display actual data
      $.get(this.props.endpoint.url, (result) => {
        Actions.dataLoaded(JSON.stringify(result, null, '  '));
      });

    });

  }

  render() {
    return <a href='#' className='button' onClick={this.fetchData}>{this.props.endpoint.name}</a>
  }
}
