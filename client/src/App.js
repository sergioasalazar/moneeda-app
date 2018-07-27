import React, { Component } from 'react';
import NavBar from './components/NavBar';
import WelcomeMessage from './components/WelcomeMessage';
import PricesList from './components/PricesList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <WelcomeMessage />
        <PricesList />
      </div>
    );
  }
}

export default App;
