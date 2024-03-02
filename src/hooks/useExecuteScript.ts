/* eslint-disable @typescript-eslint/no-explicit-any */
export function useExecuteScript<T = any>(
  func: (data?: T) => void,
  args?: T[]
) {
  return async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func,
      args: args as any,
    });
  };
}
