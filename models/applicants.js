import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    name: String,
    email: String,

    education: {
        degree: String,
        branch: String,
        institution: String,
        year: String,
    },

    experience: {
        job_title: String,
        company: String,
        start_date: String,
        end_date: String,
    },

    summary: String,
    skills: [String],
},{ collection: "applicants" });

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant; 