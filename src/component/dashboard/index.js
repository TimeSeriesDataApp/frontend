import './dashboard.scss';
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
    // master device list
    let devices = [
      { name: 'cpu', label: 'CPU' },
      { name: 'disk', label: 'Disk' },
      { name: 'memory', label: 'Memory' },
      { name: 'network', label: 'Network' },
    ];

    let chartData = this.state.rawData
      ? this.state.rawData.map(device => this.generateChartData(device))
      : null;
    console.log(this.state);
    return (
      <React.Fragment>
        <div className='dashboard'>
          <div className='chart-list'>
            {renderIf(chartData,
              chartData.map(devChartData =>
                <div key={`chart-${devChartData.device}`} className='chart-div'>
                  <Chart
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
        <Sidebar devices={devices} onComplete={this.getDiagnosticData} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
