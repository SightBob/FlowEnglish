import React, { useMemo, useState } from "react";
import { Check, Lock, Trophy, Flame, Star, Settings, Share2, Link, CheckCircle } from "lucide-react";
import { UNITS } from "./units.js";

const STORAGE_KEY = "fe-custom-units";
const loadCustomUnits = () => { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : {}; } catch { return {}; } };

function getMergedUnits() {
  const custom = loadCustomUnits();
  if (Object.keys(custom).length === 0) return UNITS;
  const out = [];
  for (const base of UNITS) {
    const c = custom[base.id];
    const topics = c?.topics
      ? c.topics.map((ct) => {
          const baseTopic = base.topics.find((t) => t.id === ct.id);
          return { ...baseTopic, ...ct };
        })
      : base.topics;
    out.push({ ...base, title: c?.title ?? base.title, topics });
  }
  for (const [id, c] of Object.entries(custom)) {
    if (UNITS.find((u) => u.id === id)) continue;
    out.push({ id, no: out.length + 1, title: c.title, planned: 0, topics: c.topics || [] });
  }
  return out;
}

// ตำแหน่งด่านบนเส้นทาง สลับซ้าย-กลาง-ขวาเหมือนงูเลื้อย
const PATH_OFFSETS = [0, 72, 0, -72];
const EXAM_OFFSET = 0;

/* ------------------------------------------------------------------ */
/* LEVEL NODE (ด่านเรื่องย่อย — ลูกกลมเล็กบนเส้นทาง)                     */
/* ------------------------------------------------------------------ */

function LevelNode({ topic, offset, status, onClick }) {
  const clickable = status !== "locked";
  let bg = "#fff";
  let borderColor = "var(--ink)";
  let inner = (
    <span className="text-base font-bold" style={{ color: "var(--ink)" }}>
      <Star size={20} color="var(--ink)" />
    </span>
  );
  let labelColor = "var(--ink)";

  if (status === "completed") {
    bg = "var(--teal)";
    borderColor = "var(--ink)";
    inner = <Check size={22} color="#fff" />;
  } else if (status === "next") {
    bg = "var(--highlighter)";
    inner = <Star size={20} color="var(--ink)" fill="var(--ink)" />;
  } else if (status === "locked") {
    bg = "#efe9d8";
    borderColor = "#d8d2c2";
    inner = <Lock size={16} color="#b5ae9c" />;
    labelColor = "#b5ae9c";
  }

  return (
    <div
      className="relative z-10 flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {status === "next" && (
        <div
          className="mb-1 px-3 py-1 text-xs font-bold whitespace-nowrap"
          style={{ background: "var(--ink)", color: "#fff" }}
        >
          เริ่มเลย
        </div>
      )}
      <button
        onClick={clickable ? onClick : undefined}
        disabled={!clickable}
        title={status === "locked" ? "เนื้อหามาเร็วๆ นี้" : topic.label}
        className="w-14 h-14 rounded-full flex items-center justify-center border-2 disabled:cursor-not-allowed"
        style={{ background: bg, borderColor, opacity: status === "locked" ? 0.75 : 1 }}
      >
        {inner}
      </button>
      <p
        className="text-xs font-semibold mt-2 text-center max-w-[130px] leading-tight"
        style={{ color: labelColor }}
      >
        {topic.label}
      </p>
      {status === "completed" && (
        <p className="text-[11px] mt-0.5" style={{ color: "var(--teal)" }}>
          ผ่านแล้ว
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UNIT BANNER (ป้ายคั่นหน่วย)                                          */
/* ------------------------------------------------------------------ */

function UnitBanner({ unit, categories }) {
  const available = unit.topics.filter((t) => t.cat && categories[t.cat]);
  const total = unit.topics.length;
  const hasContent = available.length;

  return (
    <div
      className="relative z-10 w-full flex items-center gap-3 px-4 py-3 mb-2 border-2"
      style={{
        background: hasContent ? "var(--ink)" : "#8b8f9e",
        borderColor: "var(--ink)",
        boxShadow: "3px 3px 0 rgba(31,42,68,0.15)",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
        style={{ background: "#fff", color: "var(--ink)" }}
      >
        {unit.no}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm leading-snug truncate"
          style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {unit.title}
        </p>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.75)" }}>
          {unit.planned} ข้อ
          {hasContent > 0 && ` · ${hasContent}/${total} ด่านมีเนื้อหา`}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UNITS HOME — เส้นทางด่านแบบงูเลื้อย                                   */
/* ------------------------------------------------------------------ */

export default function UnitsHome({ progress, categories, onOpenCategory, onStartExam, onManage }) {
  const units = useMemo(getMergedUnits, []);
  const availableTopics = units.flatMap((u) => u.topics).filter((t) => t.cat && categories[t.cat]);
  const completedCount = availableTopics.filter((t) => progress[t.cat] && progress[t.cat].completed).length;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("คัดลอกลิ้งนี้ส่งให้เพื่อน:", window.location.href);
    }
  };

  // หาด่านถัดไปที่ควรเรียน (ด่านแรกที่ยังไม่ผ่าน)
  let nextFound = false;
  let nodeIndex = 0;

  return (
    <div className="max-w-md mx-auto px-5 pb-24 pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--teal)", fontFamily: "var(--font-display)" }}>
            ติวก่อน แล้วค่อยลุยข้อสอบจริง
          </p>
          <h1
            className="text-2xl leading-snug mt-1"
            style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            พื้นฐานน้อยก็ไม่ต้องกลัว
          </h1>
          <p className="text-xs mt-1" style={{ color: "#8b8f9e" }}>
            13 หน่วย · ไล่ด่านทีละเรื่องย่อย
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          <div className="flex items-center gap-1 px-2.5 py-1.5" style={{ background: "#fff", border: "2px solid var(--ink)" }}>
            <Flame size={16} color="var(--highlighter)" fill="var(--highlighter)" />
            <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>
              {completedCount}/{availableTopics.length}
            </span>
          </div>
          <button
            onClick={handleShare}
            title="แชร์ลิ้งให้เพื่อน"
            aria-label="แชร์ลิ้งให้เพื่อน"
            className="p-2 flex items-center justify-center relative"
            style={{ background: copied ? "var(--teal)" : "#fff", border: "2px solid var(--ink)", transition: "background 0.2s" }}
          >
            {copied ? <CheckCircle size={16} color="#fff" /> : <Share2 size={16} color="var(--ink)" />}
          </button>
          <button
            onClick={onManage}
            title="จัดการเนื้อหา"
            aria-label="จัดการเนื้อหา"
            className="p-2 flex items-center justify-center"
            style={{ background: "#fff", border: "2px solid var(--ink)" }}
          >
            <Settings size={16} color="var(--ink)" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 text-sm font-semibold text-white shadow-lg flex items-center gap-2" style={{ background: "var(--teal)", borderRadius: 8 }}>
          <CheckCircle size={16} /> คัดลอกลิ้งแล้ว! ส่งให้เพื่อนได้เลย
        </div>
      )}

      <div className="relative flex flex-col items-center gap-4 mb-10">
        {/* เส้นทางประดิ่งขึ้นตรงกลาง */}
        <div
          className="absolute top-0 bottom-0 w-1"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            background: "repeating-linear-gradient(to bottom, #d8d2c2 0 8px, transparent 8px 16px)",
            zIndex: 0,
          }}
        />

        {units.map((unit) => (
          <React.Fragment key={unit.id}>
            <UnitBanner unit={unit} categories={categories} />
            {unit.topics.map((topic) => {
              let status = "locked";
              if (topic.cat && categories[topic.cat]) {
                status = progress[topic.cat] && progress[topic.cat].completed ? "completed" : "available";
                if (status === "available" && !nextFound) {
                  status = "next";
                  nextFound = true;
                }
              }
              const offset = PATH_OFFSETS[nodeIndex++ % PATH_OFFSETS.length];
              return (
                <LevelNode
                  key={topic.id}
                  topic={topic}
                  offset={offset}
                  status={status}
                  onClick={() => onOpenCategory(topic.cat)}
                />
              );
            })}
          </React.Fragment>
        ))}

        {/* ด่านสุดท้าย — โหมดสอบจริง */}
        <div
          className="relative z-10 flex flex-col items-center mt-2"
          style={{ transform: `translateX(${EXAM_OFFSET}px)` }}
        >
          <button
            onClick={onStartExam}
            className="w-20 h-20 rounded-full flex items-center justify-center border-4"
            style={{ background: "var(--ink)", borderColor: "var(--ink)" }}
          >
            <Trophy size={30} color="var(--highlighter)" />
          </button>
          <p className="text-sm font-semibold mt-2 text-center" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>
            โหมดสอบจริง
          </p>
          <p className="text-xs text-center max-w-[180px]" style={{ color: "#8b8f9e" }}>
            รวบรวมข้อสอบจากทุกหมวด · จับเวลา 10 นาที
          </p>
        </div>
      </div>
    </div>
  );
}
