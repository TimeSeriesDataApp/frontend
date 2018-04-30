import './sidebar.scss';
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu: false,
      disk: false,
      network: false,
      memory: false,
      duration: 'hr',
    };

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
        Diagnostics
        <form onSubmit={this.handleSubmit}>
          <div className='cbox'>
            <p>CPU</p>
            <input
              type='checkbox'
              name='cpu'
              id='cboxcpu'
              checked={this.state.cpu}
              onChange={this.handleCheckbox}
            />
            <label for='cboxcpu'></label>
          </div>

          <label>Disk
            <input
              type='checkbox'
              name='disk'
              id='cboxdisk'
              checked={this.state.disk}
              onChange={this.handleCheckbox}
            />
          </label>
          <label>Memory
            <input
              type='checkbox'
              name='memory'
              id='cboxmemory'
              checked={this.state.memory}
              onChange={this.handleCheckbox}
            />
          </label>
          <label>Network
            <input
              type='checkbox'
              name='network'
              id='cboxnetwork'
              checked={this.state.network}
              onChange={this.handleCheckbox}
            />
          </label>
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
