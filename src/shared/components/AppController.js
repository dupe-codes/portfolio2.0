import React from 'react';

import Navbar from './Navbar';
import APIButtonList from './APIButtonList';
import DataDisplay from './DataDisplay';
import MapDisplay from './MapDisplay';

export default class AppController extends React.Component {
  render() {
    return (
      <div>
        <Navbar items={[
          {text: 'github', link: 'https://github.com/njdup'}, 
          {text: 'linkedin', link: 'https://www.linkedin.com/in/nicholasdupoux'},
          {text: 'twitter', link: 'https://twitter.com/NJDup'}
        ]} />

        <MapDisplay />

        <APIButtonList endpoints={[
          {name: 'projects', url: '/api/projects'},
          {name: 'jokes', url: '/api/jokes'}
        ]}/>

        <DataDisplay />
      </div>
    );
  }
}
