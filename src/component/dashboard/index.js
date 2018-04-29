import React, { Component } from 'react';
import Sidebar from '../sidebar';
import Chart from '../chart';
import superagent from 'superagent';
import { renderIf } from '../../lib/utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
    };

    this.getDiagnosticData = this.getDiagnosticData.bind(this);
    this.generateChartData = this.generateChartData.bind(this);
  }

  getDiagnosticData(options) {
    let devices = Object.keys(options)
      .filter(opt => options[opt] && opt !== 'duration');

    // If no devices exist, remove all charts
    if (!devices.length) {
      this.setState({rawData: []});
      return;
    }

    // Request the device diagnostics
    return superagent.get(`${__API_URL__}/usage`)
      .query({
        duration: options['duration'],
        device: devices.join(','),
      })
      .then(res => {
        // mutate the data for consumption by Chart component
        let rawData = [];

        // Each device present will have an array of time offsets (seconds)
        // and usage values
        Object.keys(res.body).forEach(dev => {
          let devData = res.body[dev].reduce((result, item) => {
            result['toffset'] = (result['toffset'] || []).concat(item.toffset);
            result['usage'] = (result['usage'] || []).concat(item.usage);
            return result;
          }, {});
          devData.device = dev;
          rawData.push(devData);
        });

        console.log('rawData', rawData);

        // update the state and re-render
        this.setState({rawData});
      })
      .catch(console.error);
  }

  generateChartData(rawDeviceData) {
    console.log(rawDeviceData);
    return {
      device: rawDeviceData.device,
      chartData: {
        labels: rawDeviceData.toffset,
        datasets: [{
          label: `${rawDeviceData.device} usage`,
          data: rawDeviceData.usage,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      },
    };
  }

  render() {
    let chartData = this.state.rawData
      ? this.state.rawData.map(device => this.generateChartData(device))
      : null;
    console.log(this.state);
    return (
      <div className='dashboard'>
        <h2>Dashboard</h2>
        <Sidebar onComplete={this.getDiagnosticData} />
        <div className='chart-list'>
          {renderIf(chartData,
            chartData.map(devChartData =>
              <div className='chart-div'>
                <Chart
                  key={devChartData.device}
                  device={devChartData.device}
                  chartData={devChartData.chartData}
                  xAxisLabel='Seconds'
                  yAxisLabel='Usage'
                />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
