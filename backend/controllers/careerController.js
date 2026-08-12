import careerModel from "../models/careerModel.js";

// API to submit a new job application
export const applyForJob = async (req, res) => {
    try {
        const { jobId, jobTitle, name, email, phone, experience, portfolio, coverLetter } = req.body;

        if (!jobTitle || !name || !email || !portfolio) {
            return res.json({ success: false, message: "Missing required application details (Name, Email, Portfolio/Resume, Job Title)" });
        }

        const newApplication = new careerModel({
            jobId: jobId || 'job-general',
            jobTitle,
            name,
            email,
            phone: phone || 'Not Provided',
            experience: experience || 'Entry Level',
            portfolio,
            coverLetter: coverLetter || ''
        });

        await newApplication.save();
        res.json({ success: true, message: `Application submitted for ${jobTitle}! Our hiring team will review your profile.` });
    } catch (error) {
        console.error("Error submitting job application:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to fetch all submitted applications (for Admin dashboard)
export const getApplications = async (req, res) => {
    try {
        const applications = await careerModel.find({}).sort({ appliedAt: -1 });
        res.json({ success: true, applications });
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.json({ success: false, message: error.message });
    }
}
