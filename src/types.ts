// Popup or content script requesting the current status
export interface ScrapeRequest {
  type: 'SCRAPE_REQUESTED';
}

// Background script broadcasting current status
export interface ScrapeResponse {
  type: 'SCRAPE_SUCCEEDED';
  scrapingContent: string;
}

