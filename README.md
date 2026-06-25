# EDITH — AI Voice Assistant

> *"Even Dead, I'm The Hero"*

A voice-activated AI assistant built for tech students and developers. Talk to EDITH like a real person — she listens, thinks, and replies out loud with a natural female voice.

![EDITH Interface](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## 🎙 Live Demo

👉 **[Try EDITH Live](https://edith-green.vercel.app)**

> Best experienced on **Chrome** or **Edge** on desktop.

---

## ✨ Features

- **Voice Input** — Tap the orb, speak naturally, EDITH listens
- **AI Brain** — Powered by Groq's Llama 3.3 70B model for fast, human-like responses
- **Female Voice Output** — Replies out loud using Web Speech API with a natural female voice
- **Cinematic HUD UI** — Iron Man inspired dark interface with animated orb and waveform
- **Conversation Memory** — Remembers the full conversation context within a session
- **Interrupt Anytime** — Tap the orb mid-speech to stop EDITH and ask something new

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Voice Input | Web Speech API (SpeechRecognition) |
| Voice Output | Web Speech API (SpeechSynthesis) |
| AI Model | Groq — Llama 3.3 70B Versatile |
| API Proxy | Vercel Serverless Functions |
| Deployment | Vercel + GitHub |
| Styling | Inline CSS with HUD animations |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- A Groq API key — get one free at [console.groq.com](https://console.groq.com)
- Chrome or Edge browser

### Installation

```bash
# Clone the repo
git clone https://github.com/Hemanth20044/Edith.git
cd Edith

# Install dependencies
npm install
```

### Setup

Create a `.env` file in the root folder:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the local proxy server (in one terminal):

```bash
node proxy.cjs
```

Start the frontend (in another terminal):

```bash
npm run dev
```

Open **Chrome** and go to `http://localhost:5173`

---

## 📁 Project Structure

```
edith-voice/
├── api/
│   └── chat.js          # Vercel serverless function (API proxy)
├── src/
│   └── App.jsx          # Main React component (UI + voice logic)
├── proxy.cjs            # Local development proxy server
├── .env                 # API keys (never committed to Git)
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |

For local development — add to `.env` file.
For Vercel deployment — add in Vercel Dashboard → Settings → Environment Variables.

---

## 🌐 Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add `GROQ_API_KEY` in Environment Variables
4. Click Deploy — done in 60 seconds

Every `git push` to main auto-deploys to Vercel.

---

## 🎨 How It Works

```
User taps orb
     ↓
SpeechRecognition API captures voice
     ↓
Text sent to /api/chat (Vercel serverless function)
     ↓
Groq Llama 3.3 generates human-like response
     ↓
SpeechSynthesis API speaks the reply out loud
     ↓
Orb animates and waveform reacts in real time
```

---

## 🧠 AI Personality

EDITH is tuned to sound like a real friend, not a corporate assistant:

- Short, natural sentences — no bullet points or markdown in speech
- Uses contractions and casual language
- Reacts naturally — *"Oh yeah, that's interesting"*, *"So basically..."*
- Focused on tech, careers, AI, freelancing, and student life

---

## 📸 Screenshots

| Idle | Listening | Speaking |
|------|-----------|---------|
| 🟢 Green orb | 🔵 Blue orb | 🟣 Pink orb + world map |

---

## 🙋 Author

**Hemanth** — [@Hemanth20044](https://github.com/Hemanth20044)

Built as a student project to explore voice AI, React, and serverless deployment.

---

## 📄 License

MIT License — feel free to fork and build your own version.

---

> *Built with curiosity, caffeine, and a lot of PowerShell errors.*
