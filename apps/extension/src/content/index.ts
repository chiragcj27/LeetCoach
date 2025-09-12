import { extractProblemData, cleanProblemData, extractUserCode } from './scrape';
import { LeetCoachService } from '../services/langchain';

// Initialize LeetCoach service
const leetCoach = new LeetCoachService("");

// Create and inject the chat interface
function injectChatInterface() {
    const container = document.createElement('div');
    container.id = 'leetcoach-container';
    container.style.position = 'fixed';
    container.style.right = '20px';
    container.style.bottom = '20px';
    container.style.zIndex = '9999';
    
    document.body.appendChild(container);
    
    // Mount React component here
    // This will be handled by your React app
}

// Handle messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getHelp') {
        handleGetHelp().then(sendResponse);
        return true; // Will respond asynchronously
    }
});

async function handleGetHelp() {
    try {
        const rawProblemData = extractProblemData();
        const problemData = cleanProblemData(rawProblemData);
        const userCode = await extractUserCode();

        const helpResponse = await leetCoach.getHelp(problemData, userCode);
        
        return {
            success: true,
            data: helpResponse
        };
    } catch (error) {
        console.error('[LeetCoach] Error getting help:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

// Initialize when the page loads
injectChatInterface(); 