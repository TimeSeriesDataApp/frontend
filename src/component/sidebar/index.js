import './sidebar.scss';
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 'hr',
      cpu: false,
      disk: false,
      memory: false,
      network: false,
    };

    // configure checkbox defaults
    // this.props.devices.map(dev => this.state[dev.name] = false);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    // TODO: make sure sidebar goes away on mobile here
  }

  handleCheckbox(e) {
    let { name } = e.target;
    // toggle checked/unchecked
    this.setState({[name]: !this.state[name]});
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className='sidebar'>
        <h1>Diagnostics</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='cbox-label'>
            <input
              type='checkbox'
              name='cpu'
              id='cboxcpu'
              checked={this.state.cpu}
              onChange={this.handleCheckbox}
            />
            <div className='oval-container'></div>
            <label className='cbox-label' for='cboxcpu'>
              <p className='label-term'>CPU</p>
            </label>
          </div>

          <div className='cbox-label'>
            <input
              type='checkbox'
              name='disk'
              id='cboxdisk'
              checked={this.state.disk}
              onChange={this.handleCheckbox}
            />
            <div className='oval-container'></div>
            <label className='cbox-label' for='cboxdisk'>
              <p className='label-term'>Disk</p>
            </label>
          </div>

          <p>Duration</p>
          <select
            value={this.state.duration}
            name='duration'
            onChange={this.handleChange}
          >
            <option value='hr'>1 Hour</option>
            <option value="wk">1 Week</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default Sidebar;
