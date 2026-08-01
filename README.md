# Sailaab Sahara (سیلاب سہارا)
### Flood Relief Rights Navigator for Pakistan

**An app to Understanding your flood relief options, made simple.**

---

## ⚠️ Important Disclaimer

**This is an independent student project.** It is **not affiliated with NDMA, PDMA, or the Government of Pakistan.** It provides general, AI-assisted guidance only, not legal advice, and not a substitute for official verification. Users are directed to confirm their specific situation with their local PDMA / District Disaster Management Authority office.

If you are in immediate danger, **call Rescue 1122 first**, before using this app.

---

## The Problem

After major flooding events in Pakistan, including the 2022 floods and recurring monsoon flooding,  affected people often don't know what government relief, compensation, or support schemes they may qualify for. Information about NDMA/PDMA relief, BISP flood payments, crop and housing compensation, and required documentation is scattered across government notices, PDFs, and news coverage, usually in English, while many affected communities primarily speak Urdu.

**Sailaab Sahara** bridges that gap: a bilingual (Urdu/English) web app where someone describes their situation in plain language and receives structured, hedged guidance on what support categories may apply, what documents they'll likely need, and what steps to take, grounded in disaster-relief research, not guesswork.

---

## Core Features

- **Bilingual interface** (Urdu / English), with full RTL support for Urdu
- **AI-assisted guidance** powered by Google's Gemini API, using a carefully constrained system prompt that always hedges eligibility language and never states guaranteed entitlements
- **Local emergency detection** — messages containing danger language (e.g. "trapped," "stuck," "rising water," and Urdu equivalents) are caught *before* any AI call, immediately surfacing rescue helpline numbers instead of relief guidance
- **Verified helpline directory** — NDMA, BISP, and all four provincial PDMAs, with numbers cross-checked against official sources
- **Relief Resources reference pages** covering emergency relief, cash assistance, crop/livestock compensation, and housing compensation — including honest notes that these processes have varied significantly by district in past floods
- **Saved guidance** — users can save a response locally to revisit later, useful in low-connectivity, post-disaster conditions

---

## Screenshots

### Home Screen
(screenshots/home-screen.png)<img width="1342" height="641" alt="home-screen-english" src="https://github.com/user-attachments/assets/47ad9e1e-4fd8-4a38-8185-fd049093a7d8" />


### Guidance Response
(screenshots/guidance-response.png)<img width="1340" height="642" alt="guidance-english" src="https://github.com/user-attachments/assets/2780aea5-83bb-4ee1-8072-7b1ab435dff0" />


### Emergency Detection
(screenshots/emergency-vi<img width="1338" height="642" alt="emergency-response-eng" src="https://github.com/user-attachments/assets/e8d00aae-c0ce-4f50-b707-bb7e62956a99" />
ew.png)

### Helplines Directory
(screenshots/helplines-directory.png)<img width="1342" height="640" alt="helplines-directory" src="https://github.com/user-attachments/assets/80207023-c7d7-468e-b9f7-fc75f9b4c7e2" />


### Urdu Interface
(screenshots/urdu-view.png)<img width="1343" height="646" alt="home-screen-urdu" src="https://github.com/user-attachments/assets/caba49f5-5fe8-43e9-a926-214feb522526" />


---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React + TypeScript | Built and scaffolded via Google AI Studio |
| Styling | Tailwind CSS | Mobile-first, high-contrast for outdoor readability |
| Backend | Express (dev) / Vercel Serverless Functions (prod) | Handles AI calls server-side to keep API key secure |
| AI Model | Google Gemini (`gemini-2.5-flash`) | Called via `@google/genai` SDK, with a fixed system prompt |
| Fonts | Noto Nastaliq Urdu, Plus Jakarta Sans | Loaded via Google Fonts |
| Hosting | Vercel | Auto-deployed from GitHub `main` branch |
| Version Control | GitHub | Public repository |

---

## Why the AI Feature Is Safe by Design

The system prompt enforces several hard constraints on every response:

1. Eligibility is always phrased as *"you may be eligible for"* — never as a guaranteed fact
2. The response always closes with a reminder that this is general guidance, not an official source, and to confirm with the local PDMA/DDMA office
3. If a message contains danger language, the **local keyword check** intercepts it before the AI is even called, and only the emergency helpline block is shown
4. The AI is explicitly instructed never to claim real-time knowledge of a scheme's current status or a specific payment amount

---

## Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/ma43-source/Sailaab-Sahara.git
cd Sailaab-Sahara

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# then add your own GEMINI_API_KEY to .env

# Run the dev server
npm run dev
```

---

## Deployment

This project is deployed on **Lovable**, connected directly to the `main` branch of this repository. 

---

## Project Context

Built as an **INDEPENDENT PROJECT**, in direct response to the recurring monsoon flooding affecting Pakistan. The guidance content is grounded in independent research on climate vulnerability, disaster law, and humanitarian response frameworks.

---
