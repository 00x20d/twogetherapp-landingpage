import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Serve Vite build
app.use(express.static(path.join(__dirname, "../dist")));

// Zod Schema
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email(),
  subject: z.string().trim().min(5).max(100),
  message: z.string().trim().min(10).max(1000),
});

app.post("/api/contact", async (req, res) => {
  try {
    const validatedData = ContactSchema.parse(req.body);
    const { name, email, subject, message } = validatedData;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "Contact Form <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL],
      subject: `New Contact: ${subject}`,
      replyTo: email,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SPA fallback - must be after API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`),
);
