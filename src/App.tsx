import * as React from 'react';

import { ScrapeRequest, SCRAPE_REQUESTED, SentToServerFailed, SentToServerSucceeded, SENT_TO_SERVER_FAILED, SENT_TO_SERVER_SUCCEEDED } from './types';
import logo from './logo.png';
import './App.css';

const App = () => {
  const [scraped, setScraped] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const request: ScrapeRequest = { type: SCRAPE_REQUESTED };

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message: SentToServerFailed | SentToServerSucceeded) => {
      switch (message.type) {
        case SENT_TO_SERVER_SUCCEEDED:
          setScraped(true);
          break;
        case SENT_TO_SERVER_FAILED:
          setError(message.error);
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
      {scraped ? (
        <p className="confirm-message">Scraped and sent to server ✓</p>
      ) : (
        <>
          <p className="scrape-description">Click to scrape google search results in current page and send them to a server.</p>
          <button className="scrape-button" onClick={() => chrome.runtime.sendMessage(request)}>
            Scrape
          </button>
        </>
      )}
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default App;
