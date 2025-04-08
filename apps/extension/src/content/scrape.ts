console.log("[LeetCoach] Content script loaded!");

// Function to extract problem data
export const extractProblemData = (): string => {
    const metaTag = document.querySelector('meta[name=description]');
    return metaTag ? metaTag.getAttribute('content') || "[Error] No problem description found!" : "[Error] Meta Tag not found!";
};

export const cleanProblemData = (data: string): string => {
    const prefix = "Can you solve this real interview question? ";
    return data.startsWith(prefix) ? data.slice(prefix.length) : data;
};

// Function to wait for the code editor to appear
export const waitForEditor = (callback: () => void) => {
    const observer = new MutationObserver((_, obs) => {
        const codeLines = document.querySelectorAll(".view-line");
        if (codeLines.length > 0) {
            console.log("[LeetCoach] Code editor detected!");
            obs.disconnect(); // Stop observing once found
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

// Function to extract user code dynamically (returns a Promise)
export const extractUserCode = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const codeLines = document.querySelectorAll(".view-line");

            if (codeLines.length === 0) {
                console.error("[LeetCoach] Code editor not found!");
                reject("[Error] Code editor not found!");
                return;
            }

            let extractedCode = "";

            codeLines.forEach((line) => {
                const lineText = line.textContent || "";
                extractedCode += lineText + "\n";
            });

            // Clean up special characters
            extractedCode = extractedCode.replace(/\u200B|\u00A0/g, " ");

            resolve(extractedCode.trim());
        }, 500); // Short delay to ensure complete loading
    });
};

// Function to save extracted data
export const saveData = async () => {
    try {
        const rawproblemData = extractProblemData();
        const problemData = cleanProblemData(rawproblemData);
        const userCode = await extractUserCode(); // Wait for async function

        const extractedData = {
            problemData: problemData,
            userCode: userCode,
        };

        chrome.storage.local.set({ leetcoachData: extractedData }, () => {
            console.log("[LeetCoach] Data saved!", extractedData);
        });
    } catch (error) {
        console.error("[LeetCoach] Failed to extract user code:", error);
    }
};

// Run the script when the code editor loads
waitForEditor(() => {
    console.log("[LeetCoach] Extracting problem data...");
    saveData();
});
