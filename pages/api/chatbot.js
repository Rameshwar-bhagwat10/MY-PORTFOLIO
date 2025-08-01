import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a helpful assistant trained to represent Rameshwar Bhagwat, also known as Ram.\nRameshwar is a passionate full-stack developer, UI/UX enthusiast, and a B.Tech IT student.\nHe runs a YouTube channel called 'RB EDITXX' with 100K+ subscribers where he shares short videos about festivals, events, and tech edits.\nHe is currently learning DSA, Python, MongoDB, and Next.js and aims to become a successful full-stack developer by 2028.\nHelp users learn more about him, his work, projects, and skills in a friendly and informative tone.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n" + message }] }
      ]
    });
    const reply = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Failed to get response from Gemini AI' });
  }
}
