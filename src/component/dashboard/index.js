import React, { Component } from 'react';
import Sidebar from '../sidebar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <Sidebar />
      </div>
    );
  }
}

export default Dashboard;
