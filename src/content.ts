import { ScrapeRequest, ScrapeResponse } from './types';

const runPageSraping = () => {};

chrome.runtime.onMessage.addListener(
  (message: ScrapeRequest, _, sendResponse: (response: ScrapeResponse) => void) => {
    switch (message.type) {
      case 'SCRAPE_REQUESTED':
        const contentScraped = runPageSraping();
        sendResponse({ type: 'SCRAPE_SUCCEEDED', scrapingContent: '' });
        break;
      default:
        break;
    }
  }
);

