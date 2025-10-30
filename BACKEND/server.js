// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCdTdFCSGmsNEzqIp_dE32GECk0iwcvM00";

app.post("/api/askAI", async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY, // Use the correct header for the API key
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
                  },
                },
                { text: "Tell me what it is and all the specs of the device in a list" },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API error:", errorText);
      throw new Error("AI request failed");
    }

    const data = await response.json();
    console.log("Google API response:", data);

    const description =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No description received.";
    res.json({ description });
  } catch (err) {
    console.error("Error in /api/askAI:", err);
    res.status(500).json({ description: "AI failed to analyze image." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
