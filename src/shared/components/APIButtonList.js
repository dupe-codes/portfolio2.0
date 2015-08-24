import React from 'react';
import APIButton from './APIButton';

export default class APIButtonList extends React.Component {
  render() {
    return (
      <div className='row' style={{'padding-top':45}}>
        <ul>
          {this.props.endpoints.map((endpoint, index) => {
            return <APIButton key={index} endpoint={endpoint}/>
          }) }
        </ul>
      </div>
    );
  }
}
