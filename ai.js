// ai.js — Groq-powered analysis of learner reasoning (browser-side)
// Reads the key from Vite env:  import.meta.env.VITE_GROQ_API_KEY
// (In the browser you cannot use process.env — Vite statically replaces
//  import.meta.env.VITE_* at build time. The key is exposed to the client,
//  so treat this as a prototype feature, or move it behind a server later.)

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
const MODEL = import.meta.env.VITE_GROQ_MODEL || "openai/gpt-oss-120b";

let groqClient = null;

async function getClient() {
  if (!API_KEY) return null;
  if (!groqClient) {
    const { default: Groq } = await import("groq-sdk");
    // dangerouslyAllowBrowser: groq-sdk refuses browser usage by default
    groqClient = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  }
  return groqClient;
}

/**
 * Ask Groq to evaluate the learner's short explanation of why they
 * chose an answer, and explain whether their understanding is right.
 *
 * @param {object} opts
 * @param {string} opts.question       — the question prompt
 * @param {string[]} opts.options      — the 4 options
 * @param {number} opts.correctIndex   — index of the correct option
 * @param {string} opts.explanation    — the official explanation (key)
 * @param {string} opts.userReasoning  — what the learner typed
 * @returns {Promise<{text: string}|{error: string}>}
 */
export async function analyzeReasoning({
  question,
  options,
  correctIndex,
  explanation,
  userReasoning,
}) {
  const client = await getClient();
  if (!client) {
    return {
      error:
        "ยังไม่ได้ตั้งค่า GROQ API key — ใส่ VITE_GROQ_API_KEY ในไฟล์ .env แล้ว restart dev server",
    };
  }
  if (!userReasoning || !userReasoning.trim()) {
    return { error: "กรุณาพิมพ์เหตุผลก่อนส่ง" };
  }

  const correctAnswer = options[correctIndex];
  const choices = options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n");

  const system = `คุณคือติวเตอร์แกรมมาร์ภาษาอังกฤษสำหรับผู้เรียนไทยระดับ A2-B1
หน้าที่: วิเคราะห์ "เหตุผลที่ผู้เรียนอธิบายว่าทำไมถึงเลือกคำตอบนั้น" ว่าความเข้าใจถูกต้องหรือไม่
ตอบเป็นภาษาไทย สั้น กระชับ 3 ส่วน:
1. ✅/⚠️/❌ สรุปว่าความเข้าใจถูกต้องแค่ไหน (1 ประโยค)
2. อธิบายจุดที่คลาดเคลื่อน (ถ้ามี) หรือย้ำจุดที่เข้าใจถูกต้องแล้ว ปรับภาษาให้ง่าย ไม่ใช้ศัพท์วิชาการเกินจำเป็น
3. วิธีจำที่ถูกต้อง 1-2 ประโยค พร้อมตัวอย่างสั้น
ห้ามบอกคำตอบที่ถูกก่อนวิเคราะห์เสร็จ ห้ามถามกลับ อย่าใช้ markdown ตัวหนา`;

  const user = `โจทย์: ${question}
ตัวเลือก:
${choices}
เฉลย: ${correctAnswer} (${String.fromCharCode(65 + correctIndex)})
คำอธิบายของบทเรียน: ${explanation || "-"}

เหตุผลที่ผู้เรียนอธิบาย:
"${userReasoning}"`;

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });
    const text = completion.choices?.[0]?.message?.content?.trim() || "";
    if (!text) return { error: "AI ไม่ได้คืนคำตอบ — ลองอีกครั้ง" };
    return { text };
  } catch (err) {
    return { error: `เกิดข้อผิดพลาด: ${err?.message || String(err)}` };
  }
}