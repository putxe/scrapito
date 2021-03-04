export const SCRAPE_REQUESTED = 'SCRAPE_REQUESTED';
export const SCRAPE_START = 'SCRAPE_START';
export const SCRAPE_SUCCEEDED = 'SCRAPE_SUCCEEDED';
export const SENT_TO_SERVER_SUCCEEDED = 'SENT_TO_SERVER_SUCCEEDED';
export const SENT_TO_SERVER_FAILED = 'SENT_TO_SERVER_FAILED';

export interface ScrapeContent {
  title: string;
  link: string;
}
export interface ScrapeRequest {
  type: typeof SCRAPE_REQUESTED;
}

export interface ScrapeStart {
  type: typeof SCRAPE_START;
}
export interface ScrapeSucceeded {
  type: typeof SCRAPE_SUCCEEDED;
  content: ScrapeContent[];
}

export interface SentToServerSucceeded {
  type: typeof SENT_TO_SERVER_SUCCEEDED;
}

export interface SentToServerFailed {
  type: typeof SENT_TO_SERVER_FAILED;
}

export type MessageType = ScrapeStart | ScrapeRequest | ScrapeSucceeded | SentToServerSucceeded | SentToServerFailed;
