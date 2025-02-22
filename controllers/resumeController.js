// Description: All the resume logic is written here
import axios from "axios";
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import Applicant from "../models/applicants.js";
import {encryptData, decryptData} from "../utils/encryption.js";
import {getGeminiData} from "../utils/geminiAPI.js";
import fs from "fs";


const processResume = async (req, res) => {
    const { url } = req.body;

    try {
        let dataBuffer;

        if (url.startsWith("http://") || url.startsWith("https://")) {
            if (!url.endsWith(".pdf")) {
                return res.status(500).json({ error: "Invalid file type. Only PDFs are allowed." });
            }

            const response = await axios.get(url, { responseType: "arraybuffer" });
            dataBuffer = response.data;
        } else {
            // Assume it's a local file path
            if (!fs.existsSync(url) || !url.endsWith(".pdf")) {
                return res.status(500).json({ error: "Invalid file path or file type." });
            }

            // Read PDF from the local filesystem
            dataBuffer = fs.readFileSync(url);
        }

        // Extract text using pdf-parse
        const pdfData = await pdfParse(dataBuffer);

        if (!pdfData.text.trim()) {
            return res.status(500).json({ error: "No text found in the PDF" });
        }

        const rawText = pdfData.text;

        const prompt = `
            Extract structured resume details from the following raw text:

            ${rawText}

            Return the response strictly in the following JSON format:
            {
                "name": "<Extracted Name>",
                "email": "<Extracted Email>",
                "education": {
                    "degree": "<Extracted Degree>",
                    "branch": "<Extracted Branch>",
                    "institution": "<Extracted Institution>",
                    "year": "<Extracted Year>"
                },
                "experience": {
                    "job_title": "<Extracted Job Title>",
                    "company": "<Extracted Company>",
                    "start_date": "<Extracted Start Date>",
                    "end_date": "<Extracted End Date>"
                },
                "skills": ["<Extracted Skill 1>", "<Extracted Skill 2>", "..."],
                "summary": "<Write a short summary about the candidate profile based on extracted data>"
            }`;

        // Call LLM API to structure the data
        const structuredData = await getGeminiData(prompt);

        if (!structuredData) {
            return res.status(500).json({ error: "Failed to process LLM response" });
        }

        // Encrypt sensitive data
        structuredData.name = encryptData(structuredData.name);
        structuredData.email = encryptData(structuredData.email);


        const applicantData = {
            name: structuredData.name,
            email: structuredData.email,
            education: {
                degree: structuredData.education.degree,
                branch: structuredData.education.branch,
                institution: structuredData.education.institution,
                year: structuredData.education.year
            },
            experience: {
                job_title: structuredData.experience.job_title,
                company: structuredData.experience.company,
                start_date: structuredData.experience.start_date,
                end_date: structuredData.experience.end_date
            },
            summary: structuredData.summary,
            skills: structuredData.skills
        };

        // Save the structured data to the database
        const applicant = new Applicant(applicantData);
        
        await applicant.save();

        return res.status(200).json({ message: "Resume processed successfully", data: structuredData });
    } catch (error) {
        return res.status(500).json({ error: "Error processing resume", details: error.message });
    }
};



const searchResume = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ error: "Name parameter is required" });
        }

        let applicants = await Applicant.find({});

        if (applicants.length === 0) {
            return res.status(404).json({ error: "No resumes found" });
        }

        applicants = applicants.map(applicant => ({
            ...applicant.toObject(),
            decryptedName: decryptData(applicant.name), 
            decryptedEmail: decryptData(applicant.email),
        }));

        const searchTokens = name.toLowerCase().split(/\s+/); // Split input name into tokens

        const filteredApplicants = applicants.filter(applicant =>
            searchTokens.some(token => applicant.decryptedName.toLowerCase().includes(token))
        );

        if (filteredApplicants.length === 0) {
            return res.status(404).json({ error: "No matching resumes found" });
        }

        const response = filteredApplicants.map(({ decryptedName, decryptedEmail, ...rest }) => ({
            ...rest,
            name: decryptedName,
            email: decryptedEmail,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Error searching resumes", details: error.message });
    }
};


export { processResume, searchResume };