import React, { useState, useEffect, useRef } from "react";
import UnitsHome from "./UnitsPath.jsx";
import ContentManager from "./ContentManager.jsx";
import { loadContent, saveContent, loadProgress, saveProgress, fetchRemoteContent, pushRemoteContent, fetchRemoteUnits, pushRemoteUnits, fetchRemoteProgress, pushRemoteProgress, CATEGORY_ORDER } from "./content.js";
import { analyzeReasoning } from "./ai.js";
import {
  Check, X, Clock, ArrowRight, Home as HomeIcon, RotateCcw, PenLine,
  Sparkles, Heart, Trophy, BookOpen,
} from "lucide-react";

const EXAM_SECONDS = 600;
const START_HEARTS = 5;

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

// จัดเรียง teach cards + questions ตาม position ที่กำหนด
function buildSteps(cat) {
  const teachCount = Math.min(cat.rules.length, cat.examples.length);
  const steps = [];
  // จัดกลุ่มคำถามตาม position
  const byPosition = {};
  cat.questions.forEach((q) => {
    const pos = Number(q.position) || 1;
    if (!byPosition[pos]) byPosition[pos] = [];
    byPosition[pos].push(q);
  });
  let extras = [];
  for (let i = 0; i < teachCount; i++) {
    steps.push({ type: "teach", rule: cat.rules[i], example: cat.examples[i] });
    const qs = byPosition[i + 1];
    if (qs) qs.forEach((q) => steps.push({ type: "check", question: q }));
  }
  // คำถามที่ position > teachCount ใส่ท้าย
  Object.keys(byPosition).sort((a, b) => Number(a) - Number(b)).forEach((pos) => {
    if (Number(pos) > teachCount) byPosition[pos].forEach((q) => steps.push({ type: "check", question: q }));
  });
  return steps;
}

/* ------------------------------------------------------------------ */
/* HEARTS BAR                                                          */
/* ------------------------------------------------------------------ */

function HeartsRow({ hearts }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: START_HEARTS }).map((_, i) => (
        <Heart
          key={i}
          size={17}
          fill={i < hearts ? "var(--wrong)" : "none"}
          color={i < hearts ? "var(--wrong)" : "#d8d2c2"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VAULT MODAL (accessible any time during a session)                  */
/* ------------------------------------------------------------------ */

function VaultModal({ vault, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      style={{ background: "rgba(31,42,68,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white p-5 border-2 sm:mx-4"
        style={{ borderColor: "var(--ink)", maxHeight: "80vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-2 font-semibold" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>
            <Sparkles size={18} color="var(--teal)" />
            คลังศัพท์ช่วยชีวิต
          </p>
          <button onClick={onClose} className="p-1" aria-label="ปิด">
            <X size={20} color="var(--ink)" />
          </button>
        </div>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--teal)" }}>
          {vault.title}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {vault.columns.map((c, i) => (
                  <th key={i} className="text-left py-2 px-2 border-b-2" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vault.rows.map((row, ri) => (
                <tr key={ri} className="border-b" style={{ borderColor: "#e5ded0" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-2" style={{ color: "var(--ink)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BOTTOM FEEDBACK BAR (Duolingo-style slide up)                       */
/* ------------------------------------------------------------------ */

function FeedbackBar({ correct, message, onContinue, isLastStep }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-40 transition-transform duration-300 ease-out"
      style={{
        transform: shown ? "translateY(0)" : "translateY(100%)",
        background: correct ? "#e2f4e8" : "#fbeceb",
        borderTop: `3px solid ${correct ? "var(--correct)" : "var(--wrong)"}`,
      }}
    >
      <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: correct ? "var(--correct)" : "var(--wrong)" }}
          >
            {correct ? <Check size={18} color="#fff" /> : <X size={18} color="#fff" />}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm" style={{ color: correct ? "var(--correct)" : "var(--wrong)" }}>
              {correct ? "เก่งมาก! +10 XP" : "ยังไม่ถูกนะ"}
            </p>
            {message && (
              <p className="text-xs leading-snug mt-0.5" style={{ color: "#4a5266" }}>
                {message}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onContinue}
          className="shrink-0 px-5 py-2.5 font-semibold text-sm"
          style={{
            background: correct ? "var(--correct)" : "var(--wrong)",
            color: "#fff",
            fontFamily: "var(--font-display)",
          }}
        >
          {isLastStep ? "จบบทเรียน" : "ไปต่อ"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TEACH STEP                                                          */
/* ------------------------------------------------------------------ */

function TeachStep({ step, onAnswer, picked }) {
  const [options] = useState(() => shuffle([
    { text: step.example.right, isRight: true },
    { text: step.example.wrong, isRight: false },
  ]));

  return (
    <div>
      <div className="border-2 p-4 mb-5" style={{ borderColor: "var(--ink)", background: "var(--paper)" }}>
        <p className="flex items-center gap-2 text-xs font-bold mb-2" style={{ color: "var(--teal)" }}>
          <BookOpen size={14} /> จำไว้นะ
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--ink)" }}>
          {step.rule}
        </p>
      </div>

      <p className="text-sm font-semibold mb-3" style={{ color: "#5b6178" }}>
        แตะประโยคที่ถูกต้อง
      </p>
      <div className="space-y-3">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          let border = "#d8d2c2";
          let bg = "#fff";
          if (picked !== null) {
            if (opt.isRight) {
              border = "var(--correct)";
              bg = "#eaf6ee";
            } else if (isPicked) {
              border = "var(--wrong)";
              bg = "#fbeceb";
            }
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => onAnswer(i, opt.isRight)}
              className="w-full text-left px-4 py-4 border-2 text-base"
              style={{ borderColor: border, background: bg, color: "var(--ink)" }}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CHECK STEP (practice question)                                      */
/* ------------------------------------------------------------------ */

function CheckStep({ step, onAnswer, picked }) {
  const q = step.question;
  const [explOpen, setExplOpen] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [aiState, setAiState] = useState({ status: "idle", text: "" }); // idle | loading | done | error

  // หลังเลือกคำตอบแล้ว ให้คงส่วนอธิบายเหตุผลไว้ (auto-open ไม่ปิด)
  useEffect(() => {
    if (picked !== null) setExplOpen(true);
  }, [picked]);

  const handleAnalyze = async () => {
    if (!explanation.trim() || aiState.status === "loading") return;
    setAiState({ status: "loading", text: "" });
    const res = await analyzeReasoning({
      question: q.prompt,
      options: q.options,
      correctIndex: q.correct,
      explanation: q.explanation,
      userReasoning: explanation,
    });
    setAiState(res.error ? { status: "error", text: res.error } : { status: "done", text: res.text });
  };

  return (
    <div>
      <p className="text-lg leading-relaxed mb-5" style={{ color: "var(--ink)", fontWeight: 500 }}>
        {q.prompt}
      </p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          let border = "#d8d2c2";
          let bg = "#fff";
          if (picked !== null) {
            if (i === q.correct) {
              border = "var(--correct)";
              bg = "#eaf6ee";
            } else if (isPicked) {
              border = "var(--wrong)";
              bg = "#fbeceb";
            }
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => onAnswer(i, explanation)}
              className="w-full text-left px-4 py-3 border-2 flex items-center gap-3"
              style={{ borderColor: border, background: bg, color: "var(--ink)" }}
            >
              <span
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0"
                style={{ borderColor: "#c7c1b0", color: "#8b8f9e" }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
          <button
            onClick={() => setExplOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--teal)" }}
          >
            <PenLine size={15} /> {explOpen ? "ซ่อน" : "อธิบายเหตุผลสั้น ๆ (ไม่บังคับ)"}
          </button>
          {explOpen && (
            <div>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={2}
                placeholder="ทำไมถึงเลือกคำตอบนี้..."
                className="w-full mt-2 text-sm p-3 border resize-none focus:outline-none"
                style={{ borderColor: "#d8d2c2", color: "var(--ink)" }}
              />
              <button
                onClick={handleAnalyze}
                disabled={!explanation.trim() || aiState.status === "loading"}
                className="mt-2 flex items-center gap-1.5 text-sm font-bold px-3 py-2 disabled:opacity-40"
                style={{
                  color: "var(--teal)",
                  border: "2px solid var(--teal)",
                  background: "#fff",
                }}
              >
                <Sparkles size={14} />
                {aiState.status === "loading" ? "กำลังวิเคราะห์..." : "ส่งคำตอบให้ AI วิเคราะห์"}
              </button>
            </div>
          )}

          {aiState.status === "loading" && (
            <div className="mt-3 text-sm" style={{ color: "#5b6178" }}>
              <Sparkles size={14} className="inline mr-1 animate-pulse" />
              AI กำลังตรวจความเข้าใจของคุณ...
            </div>
          )}
          {aiState.status === "done" && (
            <div
              className="mt-3 text-sm leading-relaxed p-3 border-l-4"
              style={{ borderColor: "var(--teal)", background: "#f3faf6", color: "var(--ink)", whiteSpace: "pre-wrap" }}
            >
              {aiState.text}
            </div>
          )}
          {aiState.status === "error" && (
            <div className="mt-3 text-sm p-3 border-l-4" style={{ borderColor: "var(--wrong)", background: "#fdf3f2", color: "var(--wrong)" }}>
              {aiState.text}
            </div>
          )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LESSON SESSION (Duolingo-style)                                     */
/* ------------------------------------------------------------------ */

function LessonSession({ cat, onExit, onComplete }) {
  const [steps] = useState(() => buildSteps(cat));
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(START_HEARTS);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [picked, setPicked] = useState(null);
  const [feedback, setFeedback] = useState(null); // {correct, message}
  const [vaultOpen, setVaultOpen] = useState(false);

  const step = steps[index];
  const isLastStep = index === steps.length - 1;

  const handleTeachAnswer = (i, isRight) => {
    setPicked(i);
    if (isRight) {
      setXp((x) => x + 10);
      setCorrectCount((c) => c + 1);
      setFeedback({ correct: true, message: step.rule });
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setFeedback({ correct: false, message: step.rule });
    }
  };

  const handleCheckAnswer = (i, explanation) => {
    setPicked(i);
    const q = step.question;
    const isRight = i === q.correct;
    if (isRight) {
      setXp((x) => x + 10);
      setCorrectCount((c) => c + 1);
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
    setFeedback({ correct: isRight, message: q.explanation });
  };

  const handleContinue = () => {
    if (isLastStep) {
      onComplete({ xp, hearts, correctCount, total: steps.length });
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
    setFeedback(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-5 pb-32 pt-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onExit} aria-label="ออก" className="shrink-0">
          <X size={22} color="#8b8f9e" />
        </button>
        <div className="flex-1 h-2.5" style={{ background: "#e5ded0" }}>
          <div
            className="h-2.5 transition-all duration-300"
            style={{ width: `${((index + (picked !== null ? 1 : 0)) / steps.length) * 100}%`, background: "var(--highlighter)" }}
          />
        </div>
        <HeartsRow hearts={hearts} />
      </div>

      <button
        onClick={() => setVaultOpen(true)}
        className="flex items-center gap-1.5 text-sm font-semibold mb-5 px-3 py-1.5 border-2"
        style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "#fff" }}
      >
        <Sparkles size={15} color="var(--teal)" /> คลังศัพท์ช่วยชีวิต
      </button>

      {step.type === "teach" ? (
        <TeachStep key={index} step={step} onAnswer={handleTeachAnswer} picked={picked} />
      ) : (
        <CheckStep key={index} step={step} onAnswer={handleCheckAnswer} picked={picked} />
      )}

      {vaultOpen && <VaultModal vault={cat.vault} onClose={() => setVaultOpen(false)} />}

      {feedback && (
        <FeedbackBar
          correct={feedback.correct}
          message={feedback.message}
          onContinue={handleContinue}
          isLastStep={isLastStep}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LESSON COMPLETE (celebration)                                       */
/* ------------------------------------------------------------------ */

function LessonComplete({ cat, result, onHome, onExam }) {
  const accuracy = result.total ? Math.round((result.correctCount / result.total) * 100) : 0;
  return (
    <div className="max-w-md mx-auto px-5 pb-16 pt-16 text-center">
      <div
        className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ background: "var(--highlighter)" }}
      >
        <Trophy size={44} color="var(--ink)" />
      </div>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--teal)" }}>
        เก่งมาก!
      </p>
      <h2
        className="text-2xl mb-6"
        style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        ผ่านหมวด {cat.name} แล้ว
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="border-2 p-3" style={{ borderColor: "var(--ink)", background: "#fff" }}>
          <p className="text-xl font-bold" style={{ color: "var(--ink)" }}>{result.xp}</p>
          <p className="text-xs" style={{ color: "#8b8f9e" }}>XP</p>
        </div>
        <div className="border-2 p-3" style={{ borderColor: "var(--ink)", background: "#fff" }}>
          <p className="text-xl font-bold" style={{ color: "var(--ink)" }}>{accuracy}%</p>
          <p className="text-xs" style={{ color: "#8b8f9e" }}>แม่นยำ</p>
        </div>
        <div className="border-2 p-3" style={{ borderColor: "var(--ink)", background: "#fff" }}>
          <p className="text-xl font-bold" style={{ color: "var(--ink)" }}>{result.hearts}/{START_HEARTS}</p>
          <p className="text-xs" style={{ color: "#8b8f9e" }}>หัวใจเหลือ</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onHome}
          className="w-full py-4 font-semibold"
          style={{ background: "var(--ink)", color: "#fff", fontFamily: "var(--font-display)" }}
        >
          กลับไปดูเส้นทางติว
        </button>
        <button
          onClick={onExam}
          className="w-full py-4 font-semibold border-2"
          style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-display)" }}
        >
          ลองโหมดสอบจริงเลย
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* EXAM VIEW                                                            */
/* ------------------------------------------------------------------ */

function ExamView({ examQuestions, onFinish, onExit, categories }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish(answersRef.current);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const q = examQuestions[index];
  const isLast = index === examQuestions.length - 1;
  const low = timeLeft <= 60;

  const handleNext = () => {
    const nextAnswers = [...answers, { ...q, picked: selected }];
    if (isLast) {
      onFinish(nextAnswers);
    } else {
      setAnswers(nextAnswers);
      setSelected(null);
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 pb-16 pt-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-sm font-semibold" style={{ color: "#8b8f9e" }}>
          ออกจากโหมดสอบ
        </button>
        <div
          className="flex items-center gap-2 px-3 py-1.5 font-bold text-sm"
          style={{ background: low ? "var(--wrong)" : "var(--ink)", color: "#fff" }}
        >
          <Clock size={15} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="h-1.5 w-full mb-6" style={{ background: "#e5ded0" }}>
        <div
          className="h-1.5"
          style={{ width: `${((index + 1) / examQuestions.length) * 100}%`, background: "var(--highlighter)" }}
        />
      </div>

      <p className="text-xs font-semibold mb-2" style={{ color: "#8b8f9e" }}>
        ข้อ {index + 1} / {examQuestions.length} · หมวด {categories[q.catId].name}
      </p>

      <div className="border-2 p-5 mb-6" style={{ borderColor: "var(--ink)", background: "#fff" }}>
        <p className="text-lg leading-relaxed mb-5" style={{ color: "var(--ink)", fontWeight: 500 }}>
          {q.prompt}
        </p>
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="w-full text-left px-4 py-3 border-2 flex items-center gap-3"
              style={{
                borderColor: selected === i ? "var(--teal)" : "#d8d2c2",
                background: selected === i ? "var(--paper)" : "#fff",
                color: "var(--ink)",
              }}
            >
              <span
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  borderColor: selected === i ? "var(--teal)" : "#c7c1b0",
                  background: selected === i ? "var(--teal)" : "transparent",
                  color: selected === i ? "#fff" : "#8b8f9e",
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={selected === null}
        onClick={handleNext}
        className="w-full py-4 flex items-center justify-center gap-2 font-semibold disabled:opacity-40"
        style={{ background: "var(--ink)", color: "#fff", fontFamily: "var(--font-display)" }}
      >
        {isLast ? "ส่งคำตอบ" : "ข้อถัดไป"} <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* EXAM RESULT VIEW                                                     */
/* ------------------------------------------------------------------ */

function ExamResultView({ answers, onHome, onRetry, categories }) {
  const total = answers.length;
  const correctCount = answers.filter((a) => a.picked === a.correct).length;
  const pct = Math.round((correctCount / (total || 1)) * 100);

  const byCat = CATEGORY_ORDER.map((id) => {
    const items = answers.filter((a) => a.catId === id);
    const right = items.filter((a) => a.picked === a.correct).length;
    return { id, name: categories[id].name, right, total: items.length };
  }).filter((c) => c.total > 0);

  return (
    <div className="max-w-2xl mx-auto px-5 pb-16 pt-10">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--teal)" }}>
          ผลสอบจำลอง
        </p>
        <h2 className="text-4xl mb-2" style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 700 }}>
          {correctCount}/{total}
        </h2>
        <p className="text-sm" style={{ color: "#5b6178" }}>
          ตอบถูก {pct}% ของข้อสอบทั้งหมด
        </p>
      </div>

      <div className="border-2 p-5 mb-6" style={{ borderColor: "var(--ink)", background: "#fff" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>
          สรุปผลรายหมวด
        </p>
        <div className="space-y-3">
          {byCat.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between text-sm mb-1" style={{ color: "var(--ink)" }}>
                <span>{c.name}</span>
                <span className="font-semibold">{c.right}/{c.total}</span>
              </div>
              <div className="h-1.5 w-full" style={{ background: "#e5ded0" }}>
                <div className="h-1.5" style={{ width: `${(c.right / (c.total || 1)) * 100}%`, background: "var(--teal)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 p-5 mb-8" style={{ borderColor: "var(--ink)", background: "#fff" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--ink)" }}>
          ทบทวนข้อที่ตอบผิด
        </p>
        {answers.filter((a) => a.picked !== a.correct).length === 0 ? (
          <p className="text-sm" style={{ color: "var(--correct)" }}>
            ไม่มีข้อที่ตอบผิดเลย เก่งมาก!
          </p>
        ) : (
          <div className="space-y-4">
            {answers
              .filter((a) => a.picked !== a.correct)
              .map((a, i) => (
                <div key={i} className="text-sm pb-3 border-b" style={{ borderColor: "#e5ded0" }}>
                  <p className="mb-1" style={{ color: "var(--ink)", fontWeight: 500 }}>{a.prompt}</p>
                  <p style={{ color: "var(--wrong)" }}>
                    คุณตอบ: {a.picked === null ? "ไม่ได้ตอบ" : a.options[a.picked]}
                  </p>
                  <p style={{ color: "var(--correct)" }}>เฉลย: {a.options[a.correct]}</p>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onHome}
          className="flex-1 py-4 flex items-center justify-center gap-2 font-semibold border-2"
          style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-display)" }}
        >
          <HomeIcon size={18} /> กลับหน้าหลัก
        </button>
        <button
          onClick={onRetry}
          className="flex-1 py-4 flex items-center justify-center gap-2 font-semibold"
          style={{ background: "var(--ink)", color: "#fff", fontFamily: "var(--font-display)" }}
        >
          <RotateCcw size={18} /> ลองอีกครั้ง
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ROOT APP                                                             */
/* ------------------------------------------------------------------ */

export default function GrammarTutorApp() {
  const [view, setView] = useState("home");
  const [categoryId, setCategoryId] = useState(null);
  const [sessionResult, setSessionResult] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examAnswers, setExamAnswers] = useState([]);
  const [categories, setCategories] = useState(loadContent);

  const CUSTOM_UNITS_KEY = "fe-custom-units";
  const loadCustomUnits = () => { try { const d = localStorage.getItem(CUSTOM_UNITS_KEY); return d ? JSON.parse(d) : {}; } catch { return {}; } };
  const [customUnits, setCustomUnitsRaw] = useState(loadCustomUnits);
  const pushUnitsTimer = useRef(null);
  const setCustomUnits = (updater) => {
    setCustomUnitsRaw((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(CUSTOM_UNITS_KEY, JSON.stringify(next));
      if (pushUnitsTimer.current) clearTimeout(pushUnitsTimer.current);
      pushUnitsTimer.current = setTimeout(() => pushRemoteUnits(next), 800);
      return next;
    });
  };

  // ดึงเนื้อหาล่าสุดจากฐานข้อมูลกลาง (Supabase) — ถ้าไม่ได้จะใช้ค่าใน localStorage ต่อ
  useEffect(() => {
    let cancelled = false;
    fetchRemoteContent().then((remote) => {
      if (!cancelled && remote) setCategories(remote);
    });
    fetchRemoteUnits().then((remote) => {
      if (!cancelled && remote) {
        setCustomUnitsRaw(remote);
        localStorage.setItem(CUSTOM_UNITS_KEY, JSON.stringify(remote));
      }
    });
    fetchRemoteProgress().then((remote) => {
      if (!cancelled && remote) {
        setProgress(remote);
        saveProgress(remote);
      }
    });
    return () => { cancelled = true; };
  }, []);

  // รวมการแก้ไขติด ๆ กันเป็นรอบเดียวก่อนบันทึกขึ้นฐานข้อมูล (ลดจำนวน request ตอนพิมพ์)
  const pushTimer = useRef(null);

  const updateContent = (next) => {
    setCategories(next);
    saveContent(next);
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => pushRemoteContent(next), 800);
  };

  const pushProgressTimer = useRef(null);

  const updateProgress = (next) => {
    setProgress(next);
    saveProgress(next);
    if (pushProgressTimer.current) clearTimeout(pushProgressTimer.current);
    pushProgressTimer.current = setTimeout(() => pushRemoteProgress(next), 800);
  };

  const [progress, setProgress] = useState(() => loadProgress(loadContent()));

  const openCategory = (id) => {
    const c = categories[id];
    const teachable =
      c && (Math.min(c.rules.length, c.examples.length) > 0 || c.questions.length > 0);
    if (!teachable) {
      window.alert("หมวดนี้ยังไม่มีเนื้อหาพอให้เรียน — เพิ่มได้ในหน้าจัดการเนื้อหา");
      return;
    }
    setCategoryId(id);
    setView("session");
  };

  const completeSession = (result) => {
    setProgress((p) => {
      const next = {
        ...p,
        [categoryId]: {
          completed: true,
          attempted: result.total,
          correct: result.correctCount,
          xp: result.xp,
        },
      };
      saveProgress(next);
      pushRemoteProgress(next);
      return next;
    });
    setSessionResult(result);
    setView("sessionComplete");
  };

  const startExam = () => {
    const all = [];
    CATEGORY_ORDER.forEach((id) => {
      categories[id].questions.forEach((q) => all.push({ ...q, catId: id }));
    });
    if (all.length === 0) {
      window.alert("ยังไม่มีข้อสอบให้ทำ — เพิ่มคำถามได้ในหน้าจัดการเนื้อหา");
      return;
    }
    setExamQuestions(shuffle(all));
    setView("exam");
  };

  const finishExam = (answers) => {
    setExamAnswers(answers);
    setView("examResult");
  };

  const cat = categoryId ? categories[categoryId] : null;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "var(--paper)",
        fontFamily: "var(--font-body)",
        ["--paper"]: "#FBF6E4",
        ["--ink"]: "#1F2A44",
        ["--highlighter"]: "#FFCE45",
        ["--teal"]: "#1C7C74",
        ["--correct"]: "#2E8B57",
        ["--wrong"]: "#D64545",
        ["--font-display"]: "'Kanit', sans-serif",
        ["--font-body"]: "'IBM Plex Sans Thai', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap');
      `}</style>

      {view === "home" && (
        <UnitsHome
          progress={progress}
          categories={categories}
          onOpenCategory={openCategory}
          onStartExam={startExam}
          onManage={() => setView("manage")}
        />
      )}

      {view === "manage" && (
        <ContentManager content={categories} onChange={updateContent} customUnits={customUnits} onChangeUnits={setCustomUnits} onExit={() => setView("home")} />
      )}

      {view === "session" && cat && (
        <LessonSession cat={cat} onExit={() => setView("home")} onComplete={completeSession} />
      )}

      {view === "sessionComplete" && cat && sessionResult && (
        <LessonComplete
          cat={cat}
          result={sessionResult}
          onHome={() => setView("home")}
          onExam={startExam}
        />
      )}

      {view === "exam" && (
        <ExamView examQuestions={examQuestions} onFinish={finishExam} onExit={() => setView("home")} categories={categories} />
      )}

      {view === "examResult" && (
        <ExamResultView answers={examAnswers} onHome={() => setView("home")} onRetry={startExam} categories={categories} />
      )}
    </div>
  );
}