import nodemailer from 'nodemailer'

// Configure nodemailer transport with fallback test transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER || 'carepulse.medical.hq@gmail.com',
        pass: process.env.SMTP_PASS || 'carepulseapppass123'
    }
})

export const sendAppointmentEmail = async ({ toEmail, patientName, doctorName, date, time, consultationType, meetingLink, amount }) => {
    try {
        const mailOptions = {
            from: '"CarePulse Medical Center" <noreply@carepulse.com>',
            to: toEmail,
            subject: `🩺 Appointment Confirmation — Dr. ${doctorName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0;">
                    <div style="background: #0284c7; padding: 20px; border-radius: 12px; text-align: center; color: white;">
                        <h1 style="margin: 0; font-size: 24px;">CarePulse Medical Center</h1>
                        <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Official Appointment Confirmation</p>
                    </div>

                    <div style="padding: 20px 0;">
                        <p style="font-size: 16px; color: #0f172a;">Dear <strong>${patientName}</strong>,</p>
                        <p style="color: #475569; line-height: 1.6;">Your medical appointment with <strong>Dr. ${doctorName}</strong> has been successfully booked and confirmed in our system.</p>

                        <div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #cbd5e1; margin: 20px 0;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                                <tr><td style="padding: 6px 0;"><strong>📅 Date:</strong></td><td>${date}</td></tr>
                                <tr><td style="padding: 6px 0;"><strong>⏰ Time:</strong></td><td>${time}</td></tr>
                                <tr><td style="padding: 6px 0;"><strong>🏥 Type:</strong></td><td>${consultationType || 'In-Clinic Visit'}</td></tr>
                                <tr><td style="padding: 6px 0;"><strong>💳 Fee:</strong></td><td>₹${amount}</td></tr>
                            </table>
                        </div>

                        ${meetingLink ? `
                        <div style="background: #f0fdf4; border: 1px solid #86efac; padding: 16px; border-radius: 12px; text-align: center; margin: 20px 0;">
                            <p style="margin: 0 0 10px; color: #166534; font-weight: bold;">🎥 Online Tele-Consultation Video Room</p>
                            <a href="${meetingLink}" target="_blank" style="background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Join Video Call Room</a>
                        </div>
                        ` : ''}

                        <p style="color: #64748b; font-size: 12px; margin-top: 24px;">Please arrive 10 minutes prior to your scheduled slot. If you need to reschedule or cancel, log into your CarePulse Patient Portal.</p>
                    </div>

                    <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                        © ${new Date().getFullYear()} CarePulse Healthcare Network. All Rights Reserved.
                    </div>
                </div>
            `
        }

        const info = await transporter.sendMail(mailOptions)
        console.log("✉️ Appointment confirmation email dispatched:", info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("⚠️ Email dispatch log (Non-blocking):", error.message)
        return { success: false, error: error.message }
    }
}
