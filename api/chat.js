export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }

  const body = req.body;

  const payload = {
    model: "llama-3.3-70b-versatile",
    max_tokens: 300,
    messages: [
      { role: "system", content: body.system || "" },
      ...body.messages
    ]
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "";
  res.status(200).json({ content: [{ text: reply }] });
}