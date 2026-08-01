const SYSTEM_PROMPT = `You are an assistant helping flood-affected people in Pakistan understand what relief and compensation they may be eligible for. Respond in the same language the user writes in (Urdu or English), in plain, warm, non-bureaucratic language. Structure every response with these sections: (1) Likely relevant support categories (e.g. NDMA/PDMA emergency relief, BISP flood cash transfers, agricultural loss compensation, insurance if applicable) — always phrase eligibility as 'you may be eligible for' or 'this could apply to your situation,' never as a guaranteed fact. (2) Documents commonly needed (CNIC, proof of residence, photos of damage, land ownership papers if relevant) — note that if they lack a document, they should ask their local Union Council or NADRA office about replacement, not give up. (3) Concrete next steps, in order. Note clearly that crop/housing compensation processes and timelines have varied significantly by district in past floods, so people should expect delays and follow up persistently. (4) Always end with: 'This is general guidance from an independent project, not an official source. Please confirm your specific case with your local PDMA/District Disaster Management office.' Never state that someone definitely qualifies for a specific payment amount. Never claim to know the status of any government scheme in real time. If the user's message suggests they are in immediate physical danger (trapped, injured, need rescue), tell them clearly to call the national emergency helpline 1122 first, before anything else.`;

const EMERGENCY_REGEX =
  /rescue|1122|trapped|stuck|stranded|injured|drowning|drowned|emergency|rising water|can'?t get out|help me|زخمی|پھنسے|پھنسا|پھنس|ریسکیو|ہنگامی|خطرہ|ڈوب|پانی بڑھ/i;

export function isEmergencySituation(situation: string): boolean {
  return EMERGENCY_REGEX.test(situation);
}

const EMERGENCY_TEXT = {
  ur: "ہنگامی صورتحال! اگر آپ یا آپ کا کوئی پیارا فوری خطرے میں ہے، پھنسا ہوا ہے یا زخمی ہے تو سب سے پہلے قومی ہنگامی ہیلپ لائن 1122 پر کال کریں۔",
  en: "IMMEDIATE EMERGENCY: If you or someone near you is in immediate physical danger, trapped, or injured, call the National Emergency Helpline 1122 first, before anything else.",
};


const FORMAT_HINT = `Return your answer as JSON with exactly these keys: "emergency" (string or null — a short urgent instruction to call 1122 first, only if the person may be in immediate physical danger), "eligibility" (array of strings), "documents" (array of strings), "steps" (array of strings), "closing" (string — the required final disclaimer sentence). Each array item should be one short, plain-language sentence in the user's language.`;

export type AdviceResult = {
  emergency: string | null;
  eligibility: string[];
  documents: string[];
  steps: string[];
  closing: string;
};

function coerce(raw: string): AdviceResult {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  const slice = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(slice) as Record<string, unknown>;
  } catch {
    parsed = {};
  }
  const arr = (v: unknown) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  return {
    emergency: typeof parsed.emergency === "string" && parsed.emergency.trim() ? parsed.emergency : null,
    eligibility: arr(parsed.eligibility),
    documents: arr(parsed.documents),
    steps: arr(parsed.steps),
    closing:
      typeof parsed.closing === "string" && parsed.closing.trim()
        ? parsed.closing
        : "This is general guidance from an independent project, not an official source. Please confirm your specific case with your local PDMA/District Disaster Management office.",
  };
}

export async function getAdvice(situation: string): Promise<AdviceResult> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI is not configured.");

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-preview",
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${FORMAT_HINT}` },
        { role: "user", content: situation },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`AI request failed [${response.status}]: ${body}`);
    if (response.status === 429) throw new Error("Too many requests. Please try again in a moment.");
    if (response.status === 402) throw new Error("AI credits are exhausted for this project.");
    throw new Error(`AI request failed [${response.status}]`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content ?? "";
  const result = coerce(text);
  if (!result.eligibility.length && !result.steps.length && !result.emergency) {
    throw new Error("Could not read the AI response. Please try again.");
  }
  return result;
}
