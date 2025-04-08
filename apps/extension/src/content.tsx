import './index.css'

// import { createRoot } from 'react-dom/client'
// import { StrictMode } from 'react'
// import { extractProblemData, cleanProblemData, extractUserCode, waitForEditor } from './content/scrape';




// const root = document.createElement('div')
// root.id = 'leetcoach_container'
// document.body.append(root)
   

// createRoot(root).render(
//   <StrictMode>
//     <LeetCoachChat problemData={problemData} userCode={userCode}/>
//   </StrictMode>
// )


import { createRoot } from "react-dom/client";
import { ContentPage } from "./content/ContentPage";

// Create a container for our React app
const createAppContainer = () => {
  const container = document.createElement("div");
  container.id = "leetcoach-container";
  document.body.appendChild(container);
  return container;
};

// Check if we're on a LeetCode problem page
const isLeetCodeProblemPage = () => {
  const url = window.location.href;
  return url.includes("leetcode.com/problems/");
};

// Initialize the app when DOM is fully loaded
const initializeApp = () => {
  if (!isLeetCodeProblemPage()) return;
  
  // Check if container already exists
  let container = document.getElementById("leetcoach-container");
  if (!container) {
    container = createAppContainer();
  }
  
  const root = createRoot(container);
  root.render(<ContentPage />);
};

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleLeetCoach") {
    const container = document.getElementById("leetcoach-container");
    if (container) {
      // Toggle visibility if the app is already mounted
      container.style.display = container.style.display === "none" ? "block" : "none";
    } else {
      // Initialize the app if not already mounted
      initializeApp();
    }
  }
});

// Run the app automatically on LeetCode problem pages
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// src/background.ts
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