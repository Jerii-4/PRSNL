import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp-relay.brevo.com",
  port: process.env.EMAIL_PORT || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReminderEmail(userEmail, noteName, dueTime) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@stickyai.app",
      to: userEmail,
      subject: `📝 Reminder: ${noteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">Sticky AI - Note Reminder</h2>
          <p>Hi,</p>
          <p>This is a reminder for your note:</p>
          <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">${noteName}</p>
            <p style="margin: 8px 0; color: #666;">Due: ${new Date(
              dueTime
            ).toLocaleString("en-IN")}</p>
          </div>
          <p>Open Sticky AI to view your note and mark it as complete.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">Best regards,<br/>Sticky AI Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${userEmail}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw error;
  }
}

export async function verifyEmailService() {
  try {
    await transporter.verify();
    console.log("✅ Email service verified");
    return true;
  } catch (error) {
    console.error("❌ Email service verification failed:", error);
    return false;
  }
}
