import * as React from 'react';

import { ScrapeRequest, SCRAPE_REQUESTED, SENT_TO_SERVER_FAILED, SENT_TO_SERVER_SUCCEEDED } from './types';
import logo from './logo.png';
import './App.css';

const App = () => {
  const [scraped, setScraped] = React.useState(false);
  const request: ScrapeRequest = { type: SCRAPE_REQUESTED };

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message: any) => {
      switch (message.type) {
        case SENT_TO_SERVER_SUCCEEDED:
          setScraped(true);
          break;
        case SENT_TO_SERVER_FAILED:
          setScraped(true);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <p className="scrape-description">Click to scrape google search results in current page</p>
      <button className="scrape-button" onClick={() => chrome.runtime.sendMessage(request)}>
        {scraped ? 'Scraped ✓' : 'Scrape'}
      </button>
    </div>
  );
};

export default App;
