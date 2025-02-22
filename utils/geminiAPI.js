// Description: This file contains the code to fetch structured data from the Gemini API.
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

export const getGeminiData = async (prompt) => {
    try {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const response = await model.generateContent(prompt);

        let generatedText = response.response.text(); 

        // Remove markdown formatting (```json ... ```)
        generatedText = generatedText.replace(/```json|```/g, "").trim();

        const structuredData = JSON.parse(generatedText);

        return structuredData;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch structured data from Gemini API");
    }
};