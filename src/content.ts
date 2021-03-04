import { MessageType, ScrapeContent, ScrapeSucceeded, SCRAPE_START, SCRAPE_SUCCEEDED } from './types';

const getTitleAndLink = (resultItem: Element) => {
  const title = resultItem.querySelector('span')?.innerHTML;
  const parentNode = <HTMLAnchorElement>resultItem?.parentNode;
  const link = parentNode.href;
  if (!title || !link) return;
  return { title, link };
};

const runPageScraping: () => void = () => {
  const resultContainers = document.querySelectorAll('div a h3');
  const scrapingResult = Array.from(resultContainers).map(resultItem => getTitleAndLink(resultItem));
  const content = scrapingResult.filter(result => result && result.title && result.link) as ScrapeContent[];
  const successMessage: ScrapeSucceeded = { type: SCRAPE_SUCCEEDED, content };
  chrome.runtime.sendMessage(successMessage);
};

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case SCRAPE_START:
      runPageScraping();
      break;
    default:
      break;
  }
});
