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
                <div className='oval-container'>
                </div>
                <label className='cbox-label' htmlFor={`cbox${dev.name}`}>
                  <p className='label-term'>{dev.label}</p>
                </label>
              </div>
            )
          )}

          <div className='duration-types'>
            <input
              type='radio'
              name='duration'
              value='hr'
              id='radio-hour'
              checked={this.state.duration === 'hr'}
              onChange={this.handleChange}
            />
            <label htmlFor='radio-hour'>Hour</label>

            <input
              type='radio'
              name='duration'
              value='wk'
              id='radio-week'
              checked={this.state.duration === 'wk'}
              onChange={this.handleChange}
            />
            <label htmlFor='radio-week'>Week</label>
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default Sidebar;
