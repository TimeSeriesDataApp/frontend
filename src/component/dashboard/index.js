import React, { Component } from 'react';
import Sidebar from '../sidebar';
import superagent from 'superagent';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
    };

    this.requestChartData = this.requestChartData.bind(this);
  }

  requestChartData(options) {
    let devices = Object.keys(options)
      .filter(opt => options[opt] && opt !== 'duration');

    // If no devices exist, remove all charts
    if (!devices.length) {
      this.setState({ apiData: null });
      return;
    }

    // Request the device diagnostics
    return superagent.get(`${__API_URL__}/usage`)
      .query({
        duration: options['duration'],
        device: devices.join(','),
      })
      .then(res => this.setState({apiData: res.body}))
      .catch(console.error);
  }

  render() {
    return (
      <div className='dashboard'>
        <h2>Dashboard</h2>
        <Sidebar onComplete={this.requestChartData} />
      </div>
    );
  }
}

export default Dashboard;
