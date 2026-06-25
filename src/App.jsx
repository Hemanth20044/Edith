import { useState, useRef, useEffect, useCallback } from "react";

const SYSTEM_PROMPT = `You are EDITH — a real friend who happens to know everything about tech. You're talking to someone out loud, like a casual human conversation.

CRITICAL RULES:
- Respond like you're SPEAKING, not writing. Short sentences. Natural pauses. No bullet points, no headers, no markdown, no lists.
- Sound like a smart friend talking, not a textbook or assistant.
- Keep replies conversational length — like what you'd actually say out loud. 2-5 sentences usually. Never a wall of text.
- Use contractions: "you're", "it's", "don't", "that's", "I'd"
- React naturally: "Oh yeah, that's a good one", "Honestly?", "So basically...", "Yeah look..."
- Be genuinely helpful but human — not robotic, not corporate, not formal
- No "Certainly!", no "Great question!", no "As an AI..." — just talk normally`;

const C = "#00e5ff";

// ── Responsive hook ───────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
}

// ── HUD Background SVG (fully responsive) ────────────────────────────────────
function HUDBackground({ active, mobile }) {
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
      }}
    >
      <rect width="1000" height="600" fill="#020d18" />

      {/* Grid */}
      <g stroke="rgba(0,229,255,0.05)" strokeWidth="0.5">
        {Array.from({length:31}).map((_,i)=><line key={`h${i}`} x1="0" y1={i*20} x2="1000" y2={i*20}/>)}
        {Array.from({length:51}).map((_,i)=><line key={`v${i}`} x1={i*20} y1="0" x2={i*20} y2="600"/>)}
      </g>

      {/* Outer border */}
      <rect x="6" y="6" width="988" height="588" fill="none" stroke={C} strokeWidth="1" opacity="0.35"/>
      <rect x="12" y="12" width="976" height="576" fill="none" stroke={C} strokeWidth="0.3" opacity="0.15"/>

      {/* Corner brackets */}
      {[
        [[6,6],[80,6],[6,6],[6,80]],
        [[994,6],[920,6],[994,6],[994,80]],
        [[6,594],[80,594],[6,594],[6,520]],
        [[994,594],[920,594],[994,594],[994,520]],
      ].map((lines, ci) => (
        <g key={ci} stroke={C} strokeWidth="2" opacity="0.7">
          {lines.map(([x1,y1,x2,y2],li)=><line key={li} x1={x1} y1={y1} x2={x2} y2={y2}/>)}
        </g>
      ))}

      {/* TOP BAR */}
      <rect x="180" y="12" width="640" height="22" fill="rgba(0,229,255,0.04)" stroke={C} strokeWidth="0.4" opacity="0.5"/>
      <text x="500" y="27" textAnchor="middle" fill={C} fontSize="7" letterSpacing="4" opacity="0.6">
        E · D · I · T · H &nbsp; INTELLIGENCE SYSTEM &nbsp; ONLINE
      </text>

      {/* BOTTOM BAR */}
      <rect x="20" y="568" width="960" height="26" fill="rgba(0,229,255,0.04)" stroke={C} strokeWidth="0.3" opacity="0.5"/>
      <line x1="220" y1="568" x2="220" y2="594" stroke={C} strokeWidth="0.3" opacity="0.4"/>
      <line x1="500" y1="568" x2="500" y2="594" stroke={C} strokeWidth="0.3" opacity="0.4"/>
      <line x1="780" y1="568" x2="780" y2="594" stroke={C} strokeWidth="0.3" opacity="0.4"/>
      <text x="110" y="584" textAnchor="middle" fill={C} fontSize="6.5" letterSpacing="2" opacity="0.5">HUD v2.4.1</text>
      <text x="360" y="584" textAnchor="middle" fill={C} fontSize="6.5" letterSpacing="2" opacity="0.5">EDITH · AI VOICE ASSISTANT</text>
      <text x="640" y="584" textAnchor="middle" fill={C} fontSize="6.5" letterSpacing="1" opacity="0.5">{new Date().toUTCString().slice(0,25).toUpperCase()}</text>
      <text x="887" y="584" textAnchor="middle" fill={active?"#00ff88":C} fontSize="6.5" letterSpacing="2" opacity="0.8">{active?"● ACTIVE":"○ STANDBY"}</text>

      {/* LEFT PANEL — Globe (hidden on mobile) */}
      {!mobile && <>
        <rect x="20" y="38" width="155" height="155" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <circle cx="97" cy="115" r="55" fill="none" stroke={C} strokeWidth="0.7" opacity="0.4"/>
        <ellipse cx="97" cy="115" rx="55" ry="18" fill="none" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <ellipse cx="97" cy="115" rx="27" ry="55" fill="none" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <line x1="42" y1="115" x2="152" y2="115" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <line x1="97" y1="60" x2="97" y2="170" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <path d="M75 88 L85 83 L95 86 L93 95 L83 98 Z" fill={C} opacity="0.25"/>
        <path d="M105 96 L116 93 L121 101 L113 108 L104 105 Z" fill={C} opacity="0.25"/>
        <path d="M80 118 L90 115 L95 123 L87 129 L78 125 Z" fill={C} opacity="0.2"/>
        <text x="97" y="185" textAnchor="middle" fill={C} fontSize="7" letterSpacing="1.5" opacity="0.45">GLOBAL NETWORK</text>

        {/* Status bars */}
        <rect x="20" y="205" width="155" height="105" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <text x="30" y="222" fill={C} fontSize="6.5" letterSpacing="1.5" opacity="0.55">SYSTEM STATUS</text>
        {[
          {label:"NEURAL", val:85, y:238},
          {label:"MEMORY", val:62, y:256},
          {label:"UPLINK",  val:active?95:38, y:274, green:true},
          {label:"VOICE",   val:active?100:0, y:292, green:true},
        ].map(b=>(
          <g key={b.label}>
            <text x="30" y={b.y} fill={b.green&&active?"#00ff88":C} fontSize="6.5" opacity="0.65">{b.label}</text>
            <rect x="78" y={b.y-8} width="72" height="5" fill="rgba(0,229,255,0.07)" stroke={C} strokeWidth="0.3"/>
            <rect x="78" y={b.y-8} width={b.val*0.72} height="5" fill={b.green&&active?"#00ff88":C} opacity={active?0.75:0.35} style={{transition:"width 0.6s ease"}}/>
          </g>
        ))}

        {/* Mini chart */}
        <rect x="20" y="322" width="155" height="85" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <text x="30" y="338" fill={C} fontSize="6.5" letterSpacing="1.5" opacity="0.55">SIGNAL</text>
        {[18,30,22,45,35,28,50,33,38,25,55,30].map((h,i)=>(
          <rect key={i} x={28+i*10} y={382-h} width="6" height={h} fill={C} opacity={active?0.35+i*0.03:0.15} style={{transition:"height 0.4s ease"}}/>
        ))}
      </>}

      {/* RIGHT PANEL — Radar (hidden on mobile) */}
      {!mobile && <>
        <rect x="825" y="38" width="155" height="145" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <g stroke={C} strokeWidth="0.7" fill="none" opacity="0.5">
          <polygon points="902,52 860,130 944,130"/>
          <polygon points="902,52 860,130 902,145"/>
          <polygon points="902,52 944,130 902,145"/>
          <polygon points="860,130 944,130 902,145"/>
          <line x1="902" y1="52" x2="902" y2="145"/>
          <line x1="860" y1="130" x2="944" y2="130"/>
          <line x1="902" y1="52" x2="881" y2="91"/>
          <line x1="902" y1="52" x2="923" y2="91"/>
          <line x1="881" y1="91" x2="923" y2="91"/>
        </g>
        <text x="902" y="172" textAnchor="middle" fill={C} fontSize="7" letterSpacing="1" opacity="0.45">SPATIAL MODEL</text>

        {/* Radar */}
        <rect x="825" y="195" width="155" height="155" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <circle cx="902" cy="272" r="58" fill="none" stroke={C} strokeWidth="0.5" opacity="0.3"/>
        <circle cx="902" cy="272" r="38" fill="none" stroke={C} strokeWidth="0.5" opacity="0.25"/>
        <circle cx="902" cy="272" r="19" fill="none" stroke={C} strokeWidth="0.5" opacity="0.3"/>
        <line x1="844" y1="272" x2="960" y2="272" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <line x1="902" y1="214" x2="902" y2="330" stroke={C} strokeWidth="0.4" opacity="0.25"/>
        <line x1="861" y1="231" x2="943" y2="313" stroke={C} strokeWidth="0.3" opacity="0.15"/>
        <line x1="943" y1="231" x2="861" y2="313" stroke={C} strokeWidth="0.3" opacity="0.15"/>
        {active && <>
          <line x1="902" y1="272" x2="902" y2="214" stroke={C} strokeWidth="1.5" opacity="0.7" style={{transformOrigin:"902px 272px", animation:"radarSweep 2s linear infinite"}}/>
          {[[877,252],[930,285],[885,295]].map(([bx,by],i)=>(
            <circle key={i} cx={bx} cy={by} r="3" fill={C} opacity="0.8" style={{animation:`blipPulse ${1+i*0.4}s ease-in-out infinite`}}/>
          ))}
        </>}
        <text x="902" y="342" textAnchor="middle" fill={C} fontSize="7" letterSpacing="1" opacity="0.45">PROXIMITY SCAN</text>

        {/* Data stream */}
        <rect x="825" y="362" width="155" height="100" fill="rgba(0,229,255,0.03)" stroke={C} strokeWidth="0.5" opacity="0.5"/>
        <text x="835" y="377" fill={C} fontSize="6.5" letterSpacing="1.5" opacity="0.55">DATA STREAM</text>
        {["SYS.CORE v4.2.1","NET.PING 12ms","CPU 34% LOAD","MEM 6.2GB FREE","SEC.LEVEL AAA","ENC.AES-256"].map((line,i)=>(
          <text key={i} x="835" y={390+i*12} fill={C} fontSize="6" opacity={active?0.55:0.25} fontFamily="monospace" style={{transition:"opacity 0.5s"}}>{line}</text>
        ))}
      </>}

      {/* Glow when active */}
      {active && <>
        <defs>
          <radialGradient id="ag" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C} stopOpacity="0.05"/>
            <stop offset="100%" stopColor={C} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1000" height="600" fill="url(#ag)"/>
      </>}
    </svg>
  );
}

// ── Waveform ──────────────────────────────────────────────────────────────────
function Waveform({ active, color, mobile }) {
  const bars = mobile ? 22 : 36;
  return (
    <div style={{ display:"flex", alignItems:"center", gap: mobile?"2px":"3px", height: mobile?"36px":"44px" }}>
      {Array.from({length:bars}).map((_,i)=>(
        <div key={i} style={{
          width: mobile?"2px":"3px", borderRadius:"2px", background:color,
          height: active ? `${6+Math.abs(Math.sin(i*0.7))*28}px` : "3px",
          opacity: active ? 0.4+Math.abs(Math.sin(i*0.5))*0.6 : 0.2,
          animationName: active?"waveBar":"none",
          animationDuration:`${0.5+(i%8)*0.08}s`,
          animationTimingFunction:"ease-in-out",
          animationIterationCount:"infinite",
          animationDirection:"alternate",
          animationDelay:`${(i*0.04)%0.6}s`,
          transition:"height 0.25s ease",
        }}/>
      ))}
    </div>
  );
}

// ── EDITH Name Display (animates while talking) ───────────────────────────────
function EDITHName({ state, mobile }) {
  const configs = {
    idle:      { color: C,          glow: "rgba(0,229,255,0.4)",   sub: "STANDBY" },
    listening: { color: "#00ff88",  glow: "rgba(0,255,136,0.5)",   sub: "LISTENING" },
    thinking:  { color: "#ffcc00",  glow: "rgba(255,204,0,0.5)",   sub: "PROCESSING" },
    speaking:  { color: C,          glow: "rgba(0,229,255,0.7)",   sub: "SPEAKING" },
  };
  const c = configs[state];
  const isActive = state !== "idle";

  return (
    <div style={{ textAlign:"center", position:"relative" }}>
      {/* Animated letter-by-letter glow when speaking */}
      <div style={{ display:"flex", justifyContent:"center", gap: mobile?"6px":"12px", marginBottom:"8px" }}>
        {"EDITH".split("").map((letter, i) => (
          <span key={i} style={{
            fontSize: mobile ? "42px" : "72px",
            fontWeight: 700,
            color: c.color,
            letterSpacing: "0.05em",
            fontFamily: "'JetBrains Mono', monospace",
            textShadow: isActive
              ? `0 0 20px ${c.glow}, 0 0 40px ${c.glow}, 0 0 80px ${c.glow}`
              : `0 0 10px ${c.glow}`,
            animationName: isActive ? "letterPulse" : "none",
            animationDuration: `${0.8 + i * 0.15}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationDelay: `${i * 0.1}s`,
            transition: "color 0.4s ease, text-shadow 0.4s ease",
            display: "inline-block",
          }}>{letter}</span>
        ))}
      </div>
      <div style={{
        fontSize: mobile?"8px":"10px",
        letterSpacing:"0.3em",
        color: c.color,
        opacity: 0.6,
        fontFamily:"'JetBrains Mono', monospace",
        textShadow:`0 0 8px ${c.glow}`,
        transition:"color 0.4s ease",
        animation: isActive ? "fadeFlicker 2s ease-in-out infinite" : "none",
      }}>
        {c.sub}
      </div>
    </div>
  );
}

// ── Orb ───────────────────────────────────────────────────────────────────────
function OrbButton({ state, onClick, mobile }) {
  const configs = {
    idle:      { color: C,          glow:"rgba(0,229,255,0.4)",    ring:"rgba(0,229,255,0.08)",  emoji:"🎙" },
    listening: { color: "#00ff88",  glow:"rgba(0,255,136,0.5)",    ring:"rgba(0,255,136,0.1)",   emoji:"🎙" },
    thinking:  { color: "#ffcc00",  glow:"rgba(255,204,0,0.45)",   ring:"rgba(255,204,0,0.08)",  emoji:"🧠" },
    speaking:  { color: C,          glow:"rgba(0,229,255,0.6)",    ring:"rgba(0,229,255,0.12)",  emoji:"🔊" },
  };
  const c = configs[state];
  const size = mobile ? 110 : 150;
  const outer = mobile ? 150 : 200;
  const mid = mobile ? 130 : 175;
  const isPulse = state !== "idle";

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"14px" }}>
      <div style={{ position:"relative", width:`${outer}px`, height:`${outer}px`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", width:`${outer}px`, height:`${outer}px`, borderRadius:"50%", border:`1px solid ${c.color}`, opacity:0.25, animation:"spinSlow 8s linear infinite", borderTopColor:c.color, borderRightColor:"transparent" }}/>
        <div style={{ position:"absolute", width:`${mid}px`, height:`${mid}px`, borderRadius:"50%", border:`1px dashed ${c.color}`, opacity:0.15, animation:"spinReverse 5s linear infinite" }}/>
        <div style={{ position:"absolute", width:`${size+18}px`, height:`${size+18}px`, borderRadius:"50%", background:c.ring, animation:isPulse?"ringPulse 1.6s ease-in-out infinite":"none", transition:"background 0.5s" }}/>
        <button onClick={onClick} style={{
          width:`${size}px`, height:`${size}px`, borderRadius:"50%",
          border:`2px solid ${c.color}`,
          background:`radial-gradient(circle at 35% 35%, ${c.color}28, ${c.color}06)`,
          boxShadow:`0 0 50px ${c.glow}, inset 0 0 30px ${c.color}10`,
          cursor: state==="thinking"?"default":"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.5s", outline:"none", position:"relative", zIndex:2,
          WebkitTapHighlightColor:"transparent",
        }}>
          <span style={{
            fontSize: mobile?"36px":"48px",
            filter:`drop-shadow(0 0 10px ${c.color})`,
            animation: state==="speaking"?"speakPulse 0.5s ease-in-out infinite alternate"
                     : state==="listening"?"micPulse 0.7s ease-in-out infinite alternate":"none",
          }}>{c.emoji}</span>
        </button>
      </div>
      <div style={{ fontSize: mobile?"9px":"10px", letterSpacing:"0.22em", color:c.color, fontFamily:"'JetBrains Mono',monospace", textShadow:`0 0 12px ${c.glow}`, transition:"color 0.4s" }}>{
        state==="idle"?"TAP TO SPEAK":
        state==="listening"?"LISTENING...":
        state==="thinking"?"THINKING...":
        "SPEAKING"
      }</div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function EDITH() {
  const [state, setState]           = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse]     = useState("");
  const [error, setError]           = useState("");
  const [history, setHistory]       = useState([]);
  const [supported, setSupported]   = useState(true);
  const { w } = useWindowSize();
  const mobile = w < 700;

  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);

  useEffect(() => {
    const ok = ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && "speechSynthesis" in window;
    if (!ok) setSupported(false);
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.getVoices();
  }, []);

  // Lock body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const getFemaleVoice = useCallback(() => {
    const voices = synthRef.current.getVoices();
    for (const name of ["Microsoft Zira","Microsoft Aria","Google US English","Samantha","Karen","Moira","Tessa"]) {
      const v = voices.find(v => v.name.includes(name));
      if (v) return v;
    }
    return voices.find(v => v.lang.startsWith("en")) || null;
  }, []);

  const speak = useCallback((text) => {
    const synth = synthRef.current;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.05; utter.pitch = 1.1; utter.volume = 1;
    const voice = getFemaleVoice();
    if (voice) utter.voice = voice;
    utter.onend   = () => setState("idle");
    utter.onerror = () => setState("idle");
    setState("speaking");
    synth.speak(utter);
  }, [getFemaleVoice]);

  const askEdith = useCallback(async (userText) => {
    setState("thinking");
    setError("");
    const newHistory = [...history, { role:"user", content:userText }];
    try {
      const res = await fetch(
      window.location.hostname === "localhost" ? "http://localhost:3001" : "/api/chat",
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ system:SYSTEM_PROMPT, messages:newHistory })
      });
      if (res.status===429) { setError("Rate limited — wait a second."); setState("idle"); return; }
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, didn't catch that.";
      setHistory([...newHistory, { role:"assistant", content:reply }]);
      setResponse(reply);
      speak(reply);
    } catch {
      setError("Connection issue. Is the proxy running?");
      setState("idle");
    }
  }, [history, speak]);

  const startListening = useCallback(() => {
    if (state==="speaking") { synthRef.current.cancel(); setState("idle"); return; }
    if (state!=="idle") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang="en-US"; recognition.interimResults=true; recognition.continuous=true; recognition.maxAlternatives=1;
    let finalText=""; let silenceTimer=null;
    recognition.onstart = () => { setState("listening"); setError(""); finalText=""; };
    recognition.onresult = (e) => {
      let interim="";
      for (let i=e.resultIndex; i<e.results.length; i++) {
        if (e.results[i].isFinal) finalText+=e.results[i][0].transcript;
        else interim+=e.results[i][0].transcript;
      }
      clearTimeout(silenceTimer);
      silenceTimer=setTimeout(()=>{
        recognition.stop();
        const text=(finalText||interim).trim();
        if (text) { setTranscript(text); askEdith(text); }
        else setError("Didn't catch that — tap and try again.");
      }, 1500);
    };
    recognition.onerror = (e) => {
      clearTimeout(silenceTimer);
      if (e.error==="no-speech") setError("Didn't catch that — tap and try again.");
      else if (e.error==="not-allowed") setError("Mic blocked — allow microphone access.");
      else setError(`Error: ${e.error}`);
      setState("idle");
    };
    recognition.onend = () => { clearTimeout(silenceTimer); };
    recognitionRef.current=recognition;
    recognition.start();
  }, [state, askEdith]);

  const stateColor = { idle:C, listening:"#00ff88", thinking:"#ffcc00", speaking:C }[state];
  const isActive = state!=="idle";

  if (!supported) return (
    <div style={{ position:"fixed", inset:0, background:"#020d18", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'JetBrains Mono',monospace", color:"#ff6060", textAlign:"center", padding:"40px" }}>
      <div><p style={{fontSize:"32px",marginBottom:"16px"}}>😕</p><p style={{fontSize:"14px",lineHeight:1.7}}>Use <strong style={{color:"#fff"}}>Chrome</strong> or <strong style={{color:"#fff"}}>Edge</strong> for voice support.</p></div>
    </div>
  );

  return (
    <div style={{
      position:"fixed", inset:0,
      background:"#020d18",
      color:"#e0f8ff",
      fontFamily:"'JetBrains Mono','Courier New',monospace",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"space-between",
      overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{width:100%;height:100%;overflow:hidden;}
        @keyframes waveBar{from{transform:scaleY(0.3)}to{transform:scaleY(1)}}
        @keyframes ringPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes micPulse{from{transform:scale(1)}to{transform:scale(1.2)}}
        @keyframes speakPulse{from{transform:scale(0.9)}to{transform:scale(1.1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinReverse{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
        @keyframes radarSweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes blipPulse{0%,100%{r:2;opacity:0.3}50%{r:5;opacity:1}}
        @keyframes scanline{0%{top:-5%}100%{top:105%}}
        @keyframes letterPulse{from{opacity:0.7;transform:scale(1)}to{opacity:1;transform:scale(1.04)}}
        @keyframes fadeFlicker{0%,100%{opacity:0.6}50%{opacity:1}}
      `}</style>

      {/* HUD BG */}
      <HUDBackground active={isActive} mobile={mobile}/>

      {/* Scanline */}
      <div style={{position:"fixed",left:0,right:0,height:"2px",background:"rgba(0,229,255,0.04)",animation:"scanline 7s linear infinite",pointerEvents:"none",zIndex:1}}/>

      {/* Header row */}
      <div style={{ width:"100%", padding: mobile?"12px 16px":"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:5, flexShrink:0 }}>
        <div style={{ fontSize: mobile?"7px":"8px", color:"rgba(0,229,255,0.35)", letterSpacing:"0.15em" }}>
          {new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
        </div>
        <div style={{ fontSize: mobile?"7px":"8px", color: isActive?"#00ff88":"rgba(0,229,255,0.35)", letterSpacing:"0.15em", transition:"color 0.4s" }}>
          {isActive?"● ACTIVE":"○ STANDBY"}
        </div>
      </div>

      {/* Center content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: mobile?"20px":"28px", padding: mobile?"0 16px":"0 24px", position:"relative", zIndex:3, width:"100%" }}>

        {/* EDITH name — animates while talking */}
        <EDITHName state={state} mobile={mobile}/>

        {/* Orb */}
        <OrbButton state={state} onClick={startListening} mobile={mobile}/>

        {/* Waveform */}
        <Waveform active={isActive} color={stateColor} mobile={mobile}/>
      </div>

      {/* Bottom cards */}
      <div style={{ width:"100%", maxWidth: mobile?"100%":"580px", padding: mobile?"0 14px 28px":"0 24px 52px", display:"flex", flexDirection:"column", gap:"8px", position:"relative", zIndex:3, flexShrink:0 }}>
        {error && (
          <div style={{ padding:"8px 12px", borderRadius:"4px", background:"rgba(255,80,80,0.07)", border:"1px solid rgba(255,80,80,0.2)", fontSize: mobile?"10px":"11px", color:"#ff8080", textAlign:"center", animation:"fadeUp 0.3s ease" }}>{error}</div>
        )}
        {transcript && (
          <div style={{ padding:"9px 13px", borderRadius:"4px", background:"rgba(0,229,255,0.05)", border:"1px solid rgba(0,229,255,0.2)", animation:"fadeUp 0.3s ease" }}>
            <div style={{ fontSize:"7px", color:"rgba(0,229,255,0.45)", letterSpacing:"0.18em", marginBottom:"4px" }}>YOU SAID</div>
            <div style={{ fontSize: mobile?"11px":"12px", color:"#c8f8ff", lineHeight:1.6 }}>{transcript}</div>
          </div>
        )}
        {response && (
          <div style={{ padding:"9px 13px", borderRadius:"4px", background: state==="speaking"?"rgba(0,229,255,0.08)":"rgba(0,229,255,0.04)", border:`1px solid ${state==="speaking"?"rgba(0,229,255,0.35)":"rgba(0,229,255,0.12)"}`, animation:"fadeUp 0.3s ease", transition:"all 0.5s" }}>
            <div style={{ fontSize:"7px", color:"rgba(0,229,255,0.45)", letterSpacing:"0.18em", marginBottom:"4px" }}>EDITH</div>
            <div style={{ fontSize: mobile?"11px":"12px", color:"#e0f8ff", lineHeight:1.6 }}>{response}</div>
          </div>
        )}
        <div style={{ textAlign:"center", fontSize: mobile?"7px":"8px", color:"rgba(0,229,255,0.2)", letterSpacing:"0.12em", marginTop:"2px" }}>
          {state==="idle"&&history.length===0&&"TAP THE ORB AND START TALKING"}
          {state==="idle"&&history.length>0&&"TAP THE ORB TO CONTINUE"}
          {state==="speaking"&&"TAP THE ORB TO INTERRUPT"}
          {state==="listening"&&"SPEAK NOW"}
          {state==="thinking"&&"PROCESSING..."}
        </div>
      </div>
    </div>
  );
}