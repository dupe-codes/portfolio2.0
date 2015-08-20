import React from 'react';
import { Actions } from '../stores/APIDataStore';

export default class APIButton extends React.Component {
  constructor() {
    super();

    // Bind 'this' to component functions
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(event) {
    console.log('Fetching data from ' + this.props.endpoint.url);
    $.get(this.props.endpoint.url, (result) => {
        Actions.dataLoaded(JSON.stringify(result, null, '  '));
    });
  }

  render() {
    return <a href='#' className='button' onClick={this.fetchData}>{this.props.endpoint.name}</a>
  }
}
