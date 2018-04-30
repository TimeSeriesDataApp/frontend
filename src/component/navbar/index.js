import './navbar.scss';
import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <input type='checkbox' id='cbox-sidebar-toggle'/>
        <div className='navbar'>
          <label htmlFor='cbox-sidebar-toggle' className='label-sidebar-toggle'>≡</label>
          <h1>Diagnostic Monitor</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
