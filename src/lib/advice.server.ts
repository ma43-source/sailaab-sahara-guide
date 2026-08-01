const SYSTEM_PROMPT = `You are an assistant helping flood-affected people in Pakistan understand what relief and compensation they may be eligible for. Respond in the same language the user writes in (Urdu or English), in plain, warm, non-bureaucratic language. Structure every response with these sections: (1) Likely relevant support categories (e.g. NDMA/PDMA emergency relief, BISP flood cash transfers, agricultural loss compensation, insurance if applicable) — always phrase eligibility as 'you may be eligible for' or 'this could apply to your situation,' never as a guaranteed fact. (2) Documents commonly needed (CNIC, proof of residence, photos of damage, land ownership papers if relevant) — note that if they lack a document, they should ask their local Union Council or NADRA office about replacement, not give up. (3) Concrete next steps, in order. Note clearly that crop/housing compensation processes and timelines have varied significantly by district in past floods, so people should expect delays and follow up persistently. (4) Always end with: 'This is general guidance from an independent project, not an official source. Please confirm your specific case with your local PDMA/District Disaster Management office.' Never state that someone definitely qualifies for a specific payment amount. Never claim to know the status of any government scheme in real time. If the user's message suggests they are in immediate physical danger (trapped, injured, need rescue), tell them clearly to call the national emergency helpline 1122 first, before anything else.`;

export type AdviceInput = {
  situation: string;
  province?: string;
  district?: string;
  language?: "ur" | "en";
};

export type AdviceResult = {
  text: string;
  timestamp: string;
};

export async function getAdvice(input: AdviceInput): Promise<AdviceResult> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured.");

  let userContextPrompt = `Situation: ${input.situation.trim()}`;
  if (input.district || input.province) {
    userContextPrompt += `\nLocation context: ${[input.district, input.province]
      .filter(Boolean)
      .join(", ")}`;
  }
  if (input.language === "ur") {
    userContextPrompt += `\nPreferred response language: Urdu (اردو)`;
  } else if (input.language === "en") {
    userContextPrompt += `\nPreferred response language: English`;
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContextPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`AI request failed [${response.status}]: ${body}`);
    if (response.status === 429) throw new Error("Too many requests. Please try again in a moment.");
    if (response.status === 402) throw new Error("AI credits are exhausted for this project.");
    throw new Error("Failed to generate guidance. Please try again or check local helpline 1122.");
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text =
    data.choices?.[0]?.message?.content?.trim() ||
    "No guidance available at this moment. Please try again.";

  return { text, timestamp: new Date().toISOString() };
}
