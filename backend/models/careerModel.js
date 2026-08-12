import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "Not Provided" },
    experience: { type: String, default: "Entry Level" },
    portfolio: { type: String, required: true },
    coverLetter: { type: String, default: "" },
    status: { type: String, default: "Pending" },
    appliedAt: { type: Date, default: Date.now }
})

const careerModel = mongoose.models.career || mongoose.model('career', careerSchema)

export default careerModel
