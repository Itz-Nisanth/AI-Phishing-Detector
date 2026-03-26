import { GoogleGenAI } from "@google/genai";

export type AnalysisResult = {
  status: 'Safe' | 'Suspicious' | 'Phishing';
  confidence: number;
  explanation: string;
  suspiciousWords: string[];
};

const PHISHING_PATTERNS = [
  "urgent",
  "click here",
  "verify your account",
  "password",
  "bank",
  "immediately",
  "suspended",
  "login",
  "unauthorized",
  "security alert",
  "limited time",
  "billing error"
];

export async function analyzeEmail(text: string): Promise<AnalysisResult> {
  if (!text.trim()) {
    throw new Error("Email content cannot be empty.");
  }

  // Artificial delay to make it feel like "real AI working"
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Heuristic analysis (Simple but smart logic requested)
  const lowerText = text.toLowerCase();
  let score = 0;
  const foundWords: string[] = [];

  PHISHING_PATTERNS.forEach(word => {
    if (lowerText.includes(word)) {
      score++;
      foundWords.push(word);
    }
  });

  // Use Gemini for advanced analysis if possible
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following email content for phishing indicators. 
      Return a JSON object with the following fields:
      - status: "Safe", "Suspicious", or "Phishing"
      - confidence: a number between 0 and 100
      - explanation: a brief explanation of the findings
      - suspiciousWords: an array of specific words or phrases that triggered the result

      Email Content:
      "${text}"`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const aiResult = JSON.parse(response.text || '{}');
    
    // Merge AI results with heuristic found words to ensure all requested highlights are present
    const combinedWords = Array.from(new Set([...(aiResult.suspiciousWords || []), ...foundWords]));

    return {
      status: aiResult.status || (score >= 3 ? 'Phishing' : score >= 1 ? 'Suspicious' : 'Safe'),
      confidence: aiResult.confidence || Math.min(score * 25, 95),
      explanation: aiResult.explanation || 'Analyzed based on common phishing patterns and language structure.',
      suspiciousWords: combinedWords
    };
  } catch (error) {
    console.error("AI Analysis failed, using heuristic logic:", error);
    
    let status: 'Safe' | 'Suspicious' | 'Phishing' = 'Safe';
    if (score >= 3) status = 'Phishing';
    else if (score >= 1) status = 'Suspicious';

    return {
      status,
      confidence: Math.min(score * 25, 95),
      explanation: status === 'Safe' 
        ? "No common phishing indicators were found in the text." 
        : `Detected ${score} suspicious patterns including: ${foundWords.join(', ')}.`,
      suspiciousWords: foundWords
    };
  }
}
