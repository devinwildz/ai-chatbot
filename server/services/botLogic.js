import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchWebsiteContent } from './fetchSiteContent.js'; // ✅ add .js

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getBotReply = async (userMessage, siteURL) => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Gemini API key missing");
    return "Server configuration error. API key missing.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const siteContent = await fetchWebsiteContent(siteURL);

    const prompt = `
You are a website assistant. 
You ONLY answer from the website content below.
If info is not found in content, say: "I do not have information about that."

Website content:
${siteContent}

User: ${userMessage}
AI:
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return reply || "No reply from AI";
  } catch (err) {
    console.error("Gemini API error:", err.message);
    return "AI is currently offline. Try again.";
  }
};
