chrome.webRequest.onCompleted.addListener(
  () => {
    console.log("onCompleted");
  },
  { urls: ["*://www.facebook.com/ads/library/async/search_ads/*"] }
);
