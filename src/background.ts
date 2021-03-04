import {
  MessageType,
  ScrapeContent,
  ScrapeStart,
  SCRAPE_REQUESTED,
  SCRAPE_START,
  SCRAPE_SUCCEEDED,
  SentToServerFailed,
  SentToServerSucceeded,
  SENT_TO_SERVER_FAILED,
  SENT_TO_SERVER_SUCCEEDED,
} from './types';

const filterGooglePages = (tab: chrome.tabs.Tab) => {
  if (!tab.id) return;
  if (tab && tab.url?.match('(http|https)://www.google.(com|fr)/search')) {
    chrome.pageAction.show(tab.id);
  } else {
    chrome.pageAction.hide(tab.id);
  }
};

chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
  filterGooglePages(tab);
});

chrome.tabs.onCreated.addListener(tab => {
  filterGooglePages(tab);
});

const sendToServer = async (content: ScrapeContent[]) => {
  const api = 'https://scrapito-server.poutch.workers.dev/scrape';
  const options: RequestInit = {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  };
  try {
    if (!content || content.length <= 0) return;
    await fetch(api, options);
    const successMessage: SentToServerSucceeded = { type: SENT_TO_SERVER_SUCCEEDED };
    chrome.runtime.sendMessage(successMessage);
  } catch (error) {
    const failedMessage: SentToServerFailed = { type: SENT_TO_SERVER_FAILED, error };
    chrome.runtime.sendMessage(failedMessage);
  }
};

const startScrape = () => {
  const startMessage: ScrapeStart = { type: SCRAPE_START };
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, startMessage);
  });
};

const notifyPopUp = (message: SentToServerFailed | SentToServerSucceeded) => chrome.runtime.sendMessage(message);

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case SCRAPE_REQUESTED:
      startScrape();
      break;
    case SCRAPE_SUCCEEDED:
      sendToServer(message.content);
      break;
    case SENT_TO_SERVER_SUCCEEDED || SENT_TO_SERVER_FAILED:
      notifyPopUp(message);
      break;
    default:
      break;
  }
});
