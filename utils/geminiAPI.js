import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiData = async (prompt) => {
    try {
        // const response = await axios.post(
        //     "https://api.openai.com/v1/chat/completions",
        //     {
        //         model: "gemini-1",
        //         prompt: prompt,
        //         // messages: [{ role: "system", content: `Extract structured resume data from this text:\n\n${resumeText}` }],
        //     },
        //     { headers: 
        //         { 
        //             Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
        //         } 
        //     }
        // );

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = prompt;

        const response = await model.generateContent(prompt);

        let generatedText = response.response.text(); // Correctly access generated content

        // Remove markdown formatting (```json ... ```)
        generatedText = generatedText.replace(/```json|```/g, "").trim();

        // Parse the cleaned JSON string
        const structuredData = JSON.parse(generatedText);

        return structuredData;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch structured data from Gemini API");
    }
};