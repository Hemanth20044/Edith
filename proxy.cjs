const http = require("http");
const https = require("https");

const API_KEY = process.env.GROQ_API_KEY || "";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    const parsed = JSON.parse(body);
    const payload = JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 300,
      messages: [
        { role: "system", content: parsed.system || "" },
        ...parsed.messages
      ]
    });

    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = "";
      apiRes.on("data", chunk => data += chunk);
      apiRes.on("end", () => {
        const json = JSON.parse(data);
        const reply = json.choices?.[0]?.message?.content || "Sorry, I didn't catch that.";
        console.log("Groq response:", JSON.stringify(json));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ content: [{ text: reply }] }));
      });
    });

    apiReq.on("error", e => { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); });
    apiReq.write(payload);
    apiReq.end();
  });
});

server.listen(3001, () => console.log("Proxy running on http://localhost:3001"));