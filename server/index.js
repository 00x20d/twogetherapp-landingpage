import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import { z } from "zod";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors()); // Allows your Vite app to talk to this server
app.use(express.json());

// Zod Schema for Sanitization & Validation
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().toLowerCase(),
  subject: z.string().trim().min(5).max(100),
  message: z.string().trim().min(10).max(1000),
});

app.post("/api/contact", async (req, res) => {
  try {
    // 1. Sanitize & Validate
    const validatedData = ContactSchema.parse(req.body);

    // 2. Send Email via Resend
    const { name, email, subject, message } = validatedData;

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Verify your domain in Resend to change this
      to: [process.env.CONTACT_RECEIVER_EMAIL], // zerotoproduct@proton.me
      subject: `New Contact: ${subject}`,
      replyTo: email,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
