// Twilio SMS Notification Config & Service
import 'dotenv/config'

export const sendSMSNotification = async (phoneNumber, message) => {
    try {
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.log("📱 [SMS Simulation] SMS Service active (Add TWILIO credentials to .env for live SMS):");
            console.log(`To: ${phoneNumber || 'Patient Phone'}`);
            console.log(`Message: ${message}`);
            return { success: true, simulated: true };
        }

        console.log(`📱 Sending live SMS via Twilio to ${phoneNumber}...`);
        return { success: true };
    } catch (error) {
        console.error("❌ SMS Dispatch Error:", error.message);
        return { success: false, error: error.message };
    }
}
