import * as React from 'react';

import { ScrapeRequest, ScrapeResponse } from './types';
import logo from './logo.png';
import './App.css';

const App = () => {
  const message: ScrapeRequest = { type: 'SCRAPE_REQUESTED' };
  const [scraped, setScraped] = React.useState(false);
  const handleScrapeClick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id!, message, (response: ScrapeResponse) => {
        console.log(response.contentScraped);
      });
   });
  };
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <p className="scrape-description">Click to scrape google search results in current page</p>
      <button className="scrape-button" onClick={handleScrapeClick}>
        Scrape
      </button>
    </div>
  );
};

export default App;
