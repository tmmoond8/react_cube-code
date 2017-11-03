import React, { Component } from 'react';
import GameManager from './components/GameManager';
import GamePlay from './components/GamePlay';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={GamePlay}/>
                <Route path='/admin' component={GameManager}/>
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
