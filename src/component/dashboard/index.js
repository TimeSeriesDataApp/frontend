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
    this.getYLabel = this.getYLabel.bind(this);
  }

  getYLabel(device) {
    switch (device) {
    case 'cpu':
      return 'Processor Load Percentage';
    case 'disk':
      return 'Disk Space Usage Percentage';
    case 'network':
      return 'Network Load Percentage';
    case 'memory':
      return 'Memory Usage Percentage';
    default:
      return 'Unknown Metric';
    }
  }

  getDiagnosticData(options) {
    let devices = Object.keys(options)
      .filter(opt => options[opt] && opt !== 'duration');

    // save options to localStorage to persist through page reloads
    localStorage.options = JSON.stringify(options);

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
          devData.xAxisLabel = options.duration === 'hr'
            ? 'Seconds'
            : 'Minutes';
          devData.yAxisLabel = this.getYLabel(dev);
          rawData.push(devData);
        });

        // update the state and re-render
        this.setState({rawData});
      })
      .catch(console.error);
  }

  generateChartData(rawDeviceData) {
    return {
      device: rawDeviceData.device,
      xAxisLabel: rawDeviceData.xAxisLabel,
      yAxisLabel: rawDeviceData.yAxisLabel,
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

    // diagnostic duration options
    let timeOptions = {
      name: 'duration',
      choices: [
        { label: 'Hour', value: 'hr', checked: true},
        { label: 'Week', value: 'wk' },
      ],
    };

    let chartData = this.state.rawData
      ? this.state.rawData.map(device => this.generateChartData(device))
      : null;
    console.log('state:', this.state);
    console.log('Chartdata:', chartData);
    return (
      <React.Fragment>
        <div className='dashboard'>
          <div className='chart-list columns'>
            {renderIf(chartData.length,
              chartData.map((devChartData, idx) =>
                <div key={`chart-${devChartData.device}`} className='chart-div'>
                  <Chart
                    device={devChartData.device}
                    chartData={devChartData.chartData}
                    xAxisLabel={devChartData.xAxisLabel}
                    yAxisLabel={devChartData.yAxisLabel}
                  />
                </div>
              )
            )}
          </div>
          {renderIf(chartData.length === 0,
            <div className='no-diagnostics'><p>Please choose device diagnostics...</p></div>
          )}
        </div>
        <Sidebar
          selectSliders={devices}
          onComplete={this.getDiagnosticData}
          segmentControl={timeOptions}
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
