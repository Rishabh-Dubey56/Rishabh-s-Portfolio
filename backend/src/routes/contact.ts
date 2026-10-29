import { Router, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { generateOtp, verifyOtp } from "../services/otpService.js";
import { sendOtpEmail, sendContactNotification, sendUserReceipt, RECIPIENT_EMAIL } from "../services/mailService.js";

export const contactRouter = Router();

const sendOtpSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  otp: z.string().length(6, "Verification code must be exactly 6 digits"),
});

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const inMemoryMessages: StoredMessage[] = [];

/**
 * Request an OTP code before sending a contact message
 */
contactRouter.post("/send-otp", async (req: Request, res: Response) => {
  try {
    const parseResult = sendOtpSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten(),
      });
      return;
    }

    const { email, name } = parseResult.data;
    const otp = generateOtp(email);
    const mailResult = await sendOtpEmail(email, otp, name);

    res.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${email}`,
      simulated: mailResult.simulated,
      previewOtp: mailResult.previewOtp, // Available in dev mode for seamless testing
    });
    return;
  } catch (error) {
    console.error("Error generating or sending OTP:", error);
    res.status(500).json({ error: "Failed to send verification code. Please try again." });
    return;
  }
});

/**
 * Verify OTP and transmit contact message to dubeyrishabh997@gmail.com
 */
contactRouter.post("/", async (req: Request, res: Response) => {
  try {
    const parseResult = contactSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parseResult.error.flatten(),
      });
      return;
    }

    const { name, email, subject, message, otp } = parseResult.data;

    // 1. Verify OTP
    const verification = verifyOtp(email, otp);
    if (!verification.valid) {
      res.status(400).json({
        error: verification.reason || "Invalid or expired verification code.",
      });
      return;
    }

    // 2. Persist to DB if available, else in-memory
    try {
      await prisma.message.create({
        data: {
          name,
          email,
          subject: subject || null,
          content: message,
        },
      });
    } catch {
      inMemoryMessages.push({
        id: `msg_${Date.now()}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      });
    }

    // 3. Transmit email notification to Rishabh's email (dubeyrishabh997@gmail.com)
    await sendContactNotification({
      name,
      email,
      subject,
      message,
    });

    // 4. Send acknowledgment receipt to the user
    sendUserReceipt({ name, email, subject }).catch(() => {});

    console.log(`✅ Message from ${name} (${email}) verified & transmitted to ${RECIPIENT_EMAIL}`);

    res.status(201).json({
      success: true,
      message: `Message transmitted successfully! Delivered to ${RECIPIENT_EMAIL}.`,
      recipient: RECIPIENT_EMAIL,
    });
    return;
  } catch (error) {
    console.error("Error processing contact message:", error);
    res.status(500).json({ error: "Failed to transmit message" });
    return;
  }
});

/**
 * Fetch received messages
 */
contactRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
    return;
  } catch {
    res.json(inMemoryMessages);
    return;
  }
});
