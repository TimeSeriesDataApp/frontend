import './sidebar.scss';
import React, { Component } from 'react';
import { renderIf } from '../../lib/utils';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 'hr',
    };

    // configure checkbox defaults
    this.props.devices.map(dev => this.state[dev.name] = false);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
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
          {renderIf(this.props.devices.length,
            this.props.devices.map(dev =>
              <div key={`${dev.name}-device`} className='cbox-label'>
                <input
                  type='checkbox'
                  name={dev.name}
                  id={`cbox${dev.name}`}
                  checked={this.state[dev.name]}
                  onChange={this.handleCheckbox}
                />
                <div className='oval-container'></div>
                <label className='cbox-label' htmlFor={`cbox${dev.name}`}>
                  <p className='label-term'>{dev.label}</p>
                </label>
              </div>
            )
          )}

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
