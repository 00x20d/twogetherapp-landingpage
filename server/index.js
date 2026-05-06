import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Trust nginx proxy so rate limit sees real IP
app.set("trust proxy", 1);

// Security middleware — order matters
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  cors({
    origin: ["https://trytwogether.app", "https://www.trytwogether.app"],
  }),
);
app.use(express.json({ limit: "100kb" }));

// Rate limit only the API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, try again later" },
});
app.use("/api/", limiter);

// Serve Vite build
app.use(
  express.static(path.join(__dirname, "../dist"), {
    maxAge: "1y",
    etag: true,
  }),
);

// Validation
const ContactSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email(),
  subject: z.string().trim().min(5).max(100),
  message: z.string().trim().min(10).max(1000),
});

app.post("/api/contact", async (req, res) => {
  try {
    const data = ContactSchema.parse(req.body);

    await resend.emails.send({
      from: process.env.FROM_EMAIL || "Contact <onboarding@resend.dev>",
      to: [process.env.CONTACT_RECEIVER_EMAIL],
      subject: `New Contact: ${data.subject}`,
      replyTo: data.email,
      text: `From: ${data.name} (${data.email})\n\n${data.message}`,
    });

    console.log(`Contact from ${req.ip} - ${data.email}`);
    res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// SPA fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, "0.0.0.0", () => console.log(`Server on ${PORT}`));
