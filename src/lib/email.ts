import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendCallbackRequestEmail(
  to: string,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    preferredTime: string;
    issueCategory: string;
    message: string;
  }
) {
  const html = `
    <div style="font-family: Arial, sans-serif; background: #0F172A; color: #ffffff; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 30px; border: 1px solid rgba(59, 130, 246, 0.2);">
        <h2 style="color: #3B82F6; margin-bottom: 20px;">New Callback Request</h2>
        
        <div style="margin-bottom: 15px;">
          <strong>Name:</strong> ${data.firstName} ${data.lastName}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Email:</strong> ${data.email}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Phone:</strong> ${data.phone}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Country:</strong> ${data.country}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Preferred Callback Time:</strong> ${data.preferredTime}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Issue Category:</strong> ${data.issueCategory}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong>Message:</strong>
          <p style="background: rgba(0, 0, 0, 0.2); padding: 10px; border-radius: 6px; margin-top: 5px;">
            ${data.message.replace(/\n/g, "<br>")}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid rgba(59, 130, 246, 0.2); margin: 20px 0;">
        
        <p style="font-size: 12px; color: #94A3B8; text-align: center;">
          Chain Support - Professional Digital Asset Support
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "New Callback Request - Chain Support",
      html,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
}
