import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "dubeyrishabh997@gmail.com";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || "dubeyrishabh997@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "";

// Initialize transporter
function getTransporter() {
  if (!SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Send 6-digit OTP verification email to user
 */
export async function sendOtpEmail(toEmail: string, otpCode: string, name?: string): Promise<{ success: boolean; simulated: boolean; previewOtp?: string }> {
  const transporter = getTransporter();

  console.log(`\n======================================================`);
  console.log(`🔐 [EMAIL VERIFICATION OTP]`);
  console.log(`   Recipient: ${toEmail}`);
  console.log(`   OTP Code:  >>> ${otpCode} <<<`);
  console.log(`   Expires:   10 minutes`);
  console.log(`======================================================\n`);

  if (!transporter) {
    console.log(`ℹ️ [MAIL SERVICE] SMTP_PASS not set. Simulating OTP email send to ${toEmail}.`);
    return {
      success: true,
      simulated: true,
      previewOtp: process.env.NODE_ENV !== "production" ? otpCode : undefined,
    };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="540" style="max-width: 540px; background-color: #0d0d12; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
                <!-- Header with Brand Accent -->
                <tr>
                  <td style="padding: 32px 36px; background: linear-gradient(135deg, #18181b 0%, #0d0d12 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <div style="font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #dc2626; text-transform: uppercase;">Rishabh Dubey · Portfolio</div>
                    <div style="font-size: 24px; font-weight: 800; color: #ffffff; margin-top: 6px;">Email Verification</div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 36px 36px 28px 36px;">
                    <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin: 0 0 20px 0;">
                      Hello ${name ? `<strong>${name}</strong>` : "there"},
                    </p>
                    <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin: 0 0 28px 0;">
                      You are transmitting a message to <strong>Rishabh Dubey</strong> via the portfolio direct channel. Use the single-use 6-digit verification code below to verify your email address:
                    </p>

                    <!-- OTP Code Box -->
                    <div style="text-align: center; margin: 30px 0; padding: 22px; background: rgba(220, 38, 38, 0.08); border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 14px;">
                      <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #ef4444; display: inline-block;">
                        ${otpCode}
                      </span>
                      <div style="font-size: 12px; color: #71717a; margin-top: 8px; letter-spacing: 0.5px;">
                        Valid for 10 minutes · Do not share this code
                      </div>
                    </div>

                    <p style="font-size: 13px; line-height: 1.6; color: #71717a; margin: 24px 0 0 0;">
                      If you did not request this verification code, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 36px; background-color: #09090b; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                    <p style="font-size: 12px; color: #52525b; margin: 0;">
                      © ${new Date().getFullYear()} Rishabh Dubey · Full-Stack Developer & AI Enthusiast
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Rishabh Dubey Portfolio" <${SMTP_USER}>`,
      to: toEmail,
      subject: `Your Portfolio Verification Code: ${otpCode}`,
      text: `Your verification code for sending a message to Rishabh Dubey is: ${otpCode}. This code is valid for 10 minutes.`,
      html: htmlContent,
    });
    return { success: true, simulated: false };
  } catch (error) {
    console.error("Failed to send OTP email via SMTP:", error);
    // Return simulated fallback so user is not completely blocked
    return {
      success: true,
      simulated: true,
      previewOtp: process.env.NODE_ENV !== "production" ? otpCode : undefined,
    };
  }
}

/**
 * Transmit verified contact message to Rishabh Dubey's personal email (dubeyrishabh997@gmail.com)
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; simulated: boolean }> {
  const transporter = getTransporter();

  console.log(`\n======================================================`);
  console.log(`🚀 [TRANSMITTING MESSAGE TO RISHABH DUBEY]`);
  console.log(`   Destination: ${RECIPIENT_EMAIL}`);
  console.log(`   From:        ${data.name} <${data.email}>`);
  console.log(`   Subject:     ${data.subject || "No Subject"}`);
  console.log(`   Message:     ${data.message}`);
  console.log(`======================================================\n`);

  if (!transporter) {
    console.log(`ℹ️ [MAIL SERVICE] SMTP_PASS not set. Logged transmitted message to console.`);
    return { success: true, simulated: true };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Portfolio Message</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" style="max-width: 600px; background-color: #0d0d12; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
                <!-- Header -->
                <tr>
                  <td style="padding: 32px 36px; background: linear-gradient(135deg, #7f1d1d 0%, #0d0d12 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <div style="font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #f87171; text-transform: uppercase;">
                      ⚡ Verified Portfolio Transmission
                    </div>
                    <div style="font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 6px;">
                      New Message from ${data.name}
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px 36px;">
                    <!-- Sender Details Card -->
                    <table width="100%" style="background-color: #18181b; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 24px; padding: 18px;">
                      <tr>
                        <td style="font-size: 13px; color: #a1a1aa; padding-bottom: 6px;">Sender Name:</td>
                        <td style="font-size: 14px; font-weight: 600; color: #ffffff; padding-bottom: 6px;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #a1a1aa; padding-bottom: 6px;">Verified Email:</td>
                        <td style="font-size: 14px; font-weight: 600; color: #ef4444; padding-bottom: 6px;">
                          <a href="mailto:${data.email}" style="color: #ef4444; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #a1a1aa; padding-bottom: 6px;">Subject:</td>
                        <td style="font-size: 14px; font-weight: 600; color: #ffffff; padding-bottom: 6px;">${data.subject || "General Inquiry / Portfolio Message"}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #a1a1aa;">Received At:</td>
                        <td style="font-size: 13px; color: #a1a1aa;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                      </tr>
                    </table>

                    <!-- Message Body -->
                    <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 8px; font-weight: 700;">
                      Message Content:
                    </div>
                    <div style="padding: 20px; background-color: #09090b; border: 1px solid rgba(255, 255, 255, 0.05); border-left: 3px solid #dc2626; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">
${data.message}
                    </div>

                    <!-- Direct Reply Button -->
                    <div style="margin-top: 30px; text-align: center;">
                      <a href="mailto:${data.email}?subject=${encodeURIComponent("Re: " + (data.subject || "Portfolio Inquiry"))}" 
                         style="display: inline-block; padding: 14px 28px; background-color: #dc2626; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
                        Reply to ${data.name} (${data.email})
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 36px; background-color: #09090b; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                    <p style="font-size: 12px; color: #52525b; margin: 0;">
                      Transmitted via Rishabh Dubey's Cinematic 3D Portfolio Platform
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `🚀 [Portfolio Message] ${data.name}: ${data.subject || "General Inquiry"}`,
      text: `From: ${data.name} (${data.email})\nSubject: ${data.subject || "None"}\n\n${data.message}`,
      html: htmlContent,
    });
    return { success: true, simulated: false };
  } catch (error) {
    console.error("Failed to forward contact notification to recipient email:", error);
    return { success: true, simulated: true };
  }
}

/**
 * Send receipt confirmation to user
 */
export async function sendUserReceipt(data: {
  name: string;
  email: string;
  subject?: string;
}): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #050507; font-family: sans-serif; color: #f4f4f5; padding: 30px 10px;">
        <div style="max-width: 520px; margin: 0 auto; background: #0d0d12; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 30px;">
          <h2 style="color: #ef4444; margin-top: 0;">Message Transmitted Successfully</h2>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
            Hi <strong>${data.name}</strong>,
          </p>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
            Your message has been verified and successfully transmitted to <strong>Rishabh Dubey</strong> (<code>${RECIPIENT_EMAIL}</code>).
          </p>
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6;">
            Rishabh will review your inquiry and follow up shortly.
          </p>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 20px; padding-top: 16px; font-size: 12px; color: #71717a;">
            Rishabh Dubey · Full-Stack Developer & AI Enthusiast
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Rishabh Dubey" <${SMTP_USER}>`,
      to: data.email,
      subject: `Message Received — Rishabh Dubey`,
      text: `Hi ${data.name}, your message has been transmitted to Rishabh Dubey (${RECIPIENT_EMAIL}). Thank you for reaching out!`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Failed to send user receipt email:", err);
  }
}
