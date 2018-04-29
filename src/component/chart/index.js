import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  render() {
    return (
      <Line
        data={this.props.chartData}
        options={{
          showLines: true,
          title: {
            display: true,
            text: this.props.device,
            fontSize: 25,
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.props.xAxisLabel,
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.props.yAxisLabel,
              },
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 100,
              },
            }],
          },
        }}
      />
    )
  }
}

export default Chart;
