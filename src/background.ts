import { MessageType, ScrapeContent, ScrapeStart, SCRAPE_REQUESTED, SCRAPE_START, SCRAPE_SUCCEEDED, SentToServerFailed, SentToServerSucceeded, SENT_TO_SERVER_FAILED, SENT_TO_SERVER_SUCCEEDED } from './types';


const sendToServer = async (content: ScrapeContent[]) => {
  const successMessage: SentToServerSucceeded = { type: SENT_TO_SERVER_SUCCEEDED };
  const failedMessage: SentToServerFailed = { type: SENT_TO_SERVER_FAILED };
  try {
    if (!content || content.length <= 0) return;
    const result = await fetch('https://scrapito-server.poutch.workers.dev/scrape', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });
    const test = await result.json();
    console.log(test);
    chrome.runtime.sendMessage(successMessage);
  } catch (error) {
    chrome.runtime.sendMessage(failedMessage);
  }
};

const startScrape = () => {
  const startMessage : ScrapeStart = { type: SCRAPE_START}
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
    case SENT_TO_SERVER_SUCCEEDED:
      notifyPopUp(message);
      break;
    case SENT_TO_SERVER_FAILED:
      notifyPopUp(message);
      break;
    default:
      break;
  }
});
