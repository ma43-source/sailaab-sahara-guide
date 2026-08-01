# Sahara Relief Guide

Build a web app called "Sailaab Sahara" (Flood Relief Rights Navigator) for flood-affected people in Pakistan.

PURPOSE: Help someone who has been affected by flooding understand, in plain language, what government/relief support they may be eligible for and what steps to take next. This is an informational guide, not an official government service.

CORE FLOW:

1. Landing screen: App name, one-line tagline ("Samajhna Aasan — Understanding your flood relief options, made simple"), a prominent non-dismissible banner stating: "This is an independent student project, not affiliated with NDMA, PDMA, or the Government of Pakistan. It provides general guidance only, not legal advice. Always confirm details with your local PDMA/DDMA office."

2. Language toggle: Urdu / English, switchable at any point, default Urdu.

3. A simple form/chat interface where the user describes their situation in free text (e.g. "my house in Muzaffargarh was damaged, I lost my crops, I don't have a CNIC copy"). Do NOT ask for or store CNIC numbers, phone numbers, or exact home addresses — only district/area level location if needed.

4. On submit, send the user's description to the Gemini API with the system prompt below, and display the response in a clearly formatted card (not a raw chat bubble) with sections: "What you may be eligible for," "Documents you'll likely need," "Steps to take," and a repeated disclaimer at the bottom.

5. A simple "Resources" screen listing (as static text, not AI-generated) general categories of help: NDMA/PDMA relief, BISP flood payments, crop damage compensation, insurance claims — each with a one-line description and instruction to contact the relevant local office. Cite that this is general public information, not sourced from a live government feed.

SYSTEM PROMPT FOR THE AI FEATURE (use this exactly as the system instruction for the Gemini call):

"You are an assistant helping flood-affected people in Pakistan understand what relief and compensation they may be eligible for. Respond in the same language the user writes in (Urdu or English), in plain, warm, non-bureaucratic language. Structure every response with these sections: (1) Likely relevant support categories (e.g. NDMA/PDMA emergency relief, BISP flood cash transfers, agricultural loss compensation, insurance if applicable) — always phrase eligibility as 'you may be eligible for' or 'this could apply to your situation,' never as a guaranteed fact. (2) Documents commonly needed (CNIC, proof of residence, photos of damage, land ownership papers if relevant) — note that if they lack a document, they should ask their local Union Council or NADRA office about replacement, not give up. (3) Concrete next steps, in order. (4) Always end with: 'This is general guidance from an independent project, not an official source. Please confirm your specific case with your local PDMA/District Disaster Management office.' Never state that someone definitely qualifies for a specific payment amount. Never claim to know the status of any government scheme in real time. If the user's message suggests they are in immediate physical danger (trapped, injured, need rescue), tell them clearly to call the national emergency helpline 1122 first, before anything else."

DESIGN: Clean, calm, high-contrast (readable in bright outdoor light on a phone), minimal scrolling, large tap targets, works well on slow mobile connections. Avoid alarming colors like red as the primary theme — use a calm blue/teal palette befitting a "flood" theme without being distressing.

TECH: Simple React web app, single page, mobile-first responsive. Use Gemini API for the AI response generation, called via a backend/serverless function, not exposing any API key in frontend code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sailaab-sahara-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ddce9a5-f3e8-4fe0-9dbd-45104b3e86b6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
