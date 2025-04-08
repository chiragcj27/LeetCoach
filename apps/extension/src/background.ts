chrome.runtime.onInstalled.addListener(() => {
  console.log("LeetCoach extension installed");
});

// Add listener for browser action click
chrome.action.onClicked.addListener((tab) => {
  // Only activate the extension on LeetCode problem pages
  if (tab.url?.includes("leetcode.com/problems/")) {
    chrome.tabs.sendMessage(tab.id!, { action: "toggleLeetCoach" });
  } else {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "LeetCoach",
      message: "This extension only works on LeetCode problem pages."
    });
  }
});