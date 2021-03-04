import { ScrapeContent, ScrapeRequest, ScrapeResponse } from './types';

const getTitleAndLink = (resultItem: Element) => {
  const title = resultItem.querySelector('span')?.innerHTML;
  const parentNode = <HTMLAnchorElement>resultItem?.parentNode;
  const link = parentNode.href;
  if (!title || !link) return;
  return { title, link };
};

const runPageSraping: () => ScrapeContent[] = () => {
  const resultContainers = document.querySelectorAll('div a h3');
  const scrapingResult = Array.from(resultContainers).map(resultItem =>
    getTitleAndLink(resultItem)
  );
  return scrapingResult.filter(result => result && result.title && result.link) as ScrapeContent[];
};

chrome.runtime.onMessage.addListener(
  (message: ScrapeRequest, _, sendResponse: (response: ScrapeResponse) => void) => {
    switch (message.type) {
      case 'SCRAPE_REQUESTED':
        const contentScraped = runPageSraping();
        sendResponse({ type: 'SCRAPE_SUCCEEDED', contentScraped });
        break;
      default:
        break;
    }
  }
);
