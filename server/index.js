// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

// If you later deploy, you can tighten this to your frontend domain instead of true.
app.use(cors({ origin: true }));
app.use(express.json());

// Rate limit all /api routes (prevents spam clicking)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,             // 10 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

app.post("/api/answer", async (req, res) => {
  try {
    const { answer } = req.body; // "yes" | "no"
    if (answer !== "yes" && answer !== "no") {
      return res.status(400).json({ error: "Invalid answer" });
    }

    if (!process.env.DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ error: "Missing DISCORD_WEBHOOK_URL" });
    }

    const when = new Date().toISOString();
    const payload = {
      content: `💌 Valentine response received: **${answer.toUpperCase()}**\n🕒 ${when}`,
    };

    const resp = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      return res.status(502).json({ error: "Failed to notify Discord" });
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
