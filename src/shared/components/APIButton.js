import React from 'react';

export default class APIButton extends React.Component {
  fetchData(event) {
    console.log('Fetching data from ' + this.props.endpoint.url);
  }

  render() {
    return <a href='#' className='button' onClick={this.fetchData.bind(this)}>{this.props.endpoint.name}</a>
  }
}
