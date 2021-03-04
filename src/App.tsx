import * as React from 'react';
import logo from './logo.png';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <p className="scrape-description">Click to scrape google search results in current page</p>
      <button className="scrape-button" onClick={() => alert('message sent')}>Scrape</button>
    </div>
  );
};

export default App;
