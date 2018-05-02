import React, { Component } from 'react';
import { renderIfElse } from '../../lib/utils';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // configure checkbox defaults
    if (this.props.selectSliders)
      this.props.selectSliders.map(dev => this.state[dev.name] = false);

    // configure state variables for segmented controls
    if (this.props.segmentControl) {
      this.props.segmentControl.choices.map(c => {
        if (c.checked) this.state[this.props.segmentControl.name] = c.value;
      });
    }

    // restore previous state if possible
    if (localStorage.options) {
      for (const [key, value] of Object.entries(JSON.parse(localStorage.options))) {
        this.state[key] = value;
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    // restore charts from previous selections
    if (localStorage.options) {
      this.props.onComplete(this.state);
    }
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
        <form onSubmit={this.handleSubmit}>
          <h1>Diagnostics</h1>
          {renderIfElse(this.props.selectSliders.length,
            this.props.selectSliders.map(dev =>
              <div key={`${dev.name}-device`} className='cbox-label'>
                <input
                  className='select-slider'
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
            ,
            <div>Ooops</div>
          )}

          <div className='segmented-control-types'>
            {renderIfElse(this.props.segmentControl,
              this.props.segmentControl.choices.map(choice =>
                <React.Fragment key={`_frag-${choice.value}`}>
                  <input
                    className='segment-control'
                    type='radio'
                    name={this.props.segmentControl.name}
                    value={choice.value}
                    id={`radio-${choice.value}`}
                    checked={this.state[this.props.segmentControl.name] === choice.value}
                    onChange={this.handleChange}
                  />
                  <label htmlFor={`radio-${choice.value}`}>
                    {choice.label}
                  </label>
                </React.Fragment>
              )
              ,
              <div>Ooops</div>
            )}
          </div>

          <button type="submit">Fetch</button>
        </form>
      </div>
    );
  }
}

export default Sidebar;
