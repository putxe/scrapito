export interface ScrapeContent {
  title: string;
  link: string;
}
export interface ScrapeRequest {
  type: 'SCRAPE_REQUESTED';
}
export interface ScrapeResponse {
  type: 'SCRAPE_SUCCEEDED';
  contentScraped: ScrapeContent[];
}

