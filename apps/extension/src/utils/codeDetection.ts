// src/utils/codeDetection.ts
export function detectLanguage(code: string): string {
    if (!code || !code.trim()) return "unknown";
    
    // Simple language detection based on syntax patterns
    if (code.includes("function") && (code.includes("=>") || code.includes("return"))) {
      return "javascript";
    } else if (code.includes("def ") && code.includes(":")) {
      return "python";
    } else if (code.includes("public class") || 
              (code.includes("{") && code.includes(";") && 
               (code.includes("public") || code.includes("private")))) {
      return "java";
    } else if (code.includes("#include") && 
              (code.includes("<vector>") || code.includes("<iostream>"))) {
      return "cpp";
    } else if (code.includes("func ") && (code.includes("interface") || code.includes("package"))) {
      return "go";
    }
    
    return "unknown";
  }
  
  // src/utils/helpers.ts
  export function truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength) + "...";
  }
  
  export function parseCodeBlocks(text: string): string {
    if (!text) return "";
    
    // Convert markdown code blocks to HTML
    const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/g;
    return text.replace(codeBlockRegex, (_, language, code) => {
      return `<pre class="code-block ${language || ''}"><code>${code}</code></pre>`;
    });
  }