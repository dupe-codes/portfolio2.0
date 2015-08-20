import React from 'react';
import Highlight from 'react-highlight';
import { APIDataStore } from '../stores/APIDataStore';

export default class DataDisplay extends React.Component {
  constructor() {
    super();

    // Set initial state
    this.state = {
      data: 'My API data will be displayed here.'
    }

    // Bind 'this' to component functions
    this.onDataReceived = this.onDataReceived.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  onDataReceived(data) {
    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.unsubscribe = APIDataStore.listen(this.onDataReceived);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Highlight className='json'>
        {this.state.data}
      </Highlight>
    );
  }
}
