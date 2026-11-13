import emailjs from "@emailjs/browser";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

export interface EmailSendResult {
  success: boolean;
  message: string;
  simulated?: boolean;
}

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  recipientEmail: "dubeyrishabh997@gmail.com",
};

export function isEmailJSConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey
  );
}

/**
 * Send contact email directly via EmailJS from frontend
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<EmailSendResult> {
  // 1. Spam protection: If hidden honeypot field is filled, silently discard spam
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: true,
      message: "Message processed.",
      simulated: true,
    };
  }

  // 2. Strict client-side validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name || !email || !message) {
    throw new Error("Please complete all required fields (Name, Email, and Message).");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Please provide a valid email address (e.g., name@domain.com).");
  }

  if (message.length < 10) {
    throw new Error("Message must be at least 10 characters.");
  }

  // 3. Fallback / simulated mode when EmailJS credentials are not yet set
  if (!isEmailJSConfigured()) {
    console.info(
      `ℹ️ [EmailJS] Environment credentials not configured. Message simulated.\n` +
      `   Recipient: ${EMAILJS_CONFIG.recipientEmail}\n` +
      `   From: ${name} <${email}>\n` +
      `   Subject: ${data.subject || "Portfolio Contact Inquiry"}\n` +
      `   To enable real live dispatch, configure NEXT_PUBLIC_EMAILJS_SERVICE_ID, ` +
      `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local.`
    );

    return {
      success: true,
      message: `Message verified! EmailJS credentials pending in .env.local (simulated preview). Destination: ${EMAILJS_CONFIG.recipientEmail}`,
      simulated: true,
    };
  }

  // 4. Live dispatch via EmailJS
  try {
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: data.subject?.trim() || "Portfolio Contact Inquiry",
      message: message,
      to_email: EMAILJS_CONFIG.recipientEmail,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    if (response.status === 200) {
      return {
        success: true,
        message: `Your message has been delivered to ${EMAILJS_CONFIG.recipientEmail}. Thank you for reaching out!`,
        simulated: false,
      };
    } else {
      throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
    }
  } catch (err: unknown) {
    console.error("EmailJS dispatch failed:", err);
    const errorMessage =
      typeof err === "object" && err !== null && "text" in err
        ? String((err as { text: unknown }).text)
        : err instanceof Error
        ? err.message
        : "Failed to dispatch email via EmailJS.";
    throw new Error(errorMessage);
  }
}
