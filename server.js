import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: "You are MED AI, an intelligent assistant built by MEDTECH." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () =>
  console.log("MED AI running at http://localhost:3000")
);