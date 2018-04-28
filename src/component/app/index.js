import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../navbar';
import Dashboard from '../dashboard';

const store = createStore();

class App extends Component {
  render() {
    return (
      <div className='application'>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <Route exact path='/' component={Dashboard}></Route>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
