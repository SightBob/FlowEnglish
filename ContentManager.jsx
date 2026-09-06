import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowLeft, ChevronDown, ChevronRight, Plus, Trash2, Download, Upload, RotateCcw,
  Search, BookOpen, Lock, X, Pencil, Save,
} from "lucide-react";
import { UNITS } from "./units.js";
import {
  exportContent, importContent, resetContent,
  pushRemoteContent, pushRemoteUnits, pushRemoteProgress,
  BUILTIN_ICONS,
} from "./content.js";

const TAB_LIST = ["info", "teach", "vault", "questions"];
const TAB_LABELS = { info: "ข้อมูล", teach: "จำไว้นะ", vault: "คลังศัพท์", questions: "คำถาม" };

const emptyCat = (id, name) => ({
  id, iconName: "BookOpen", name, tagline: "",
  rules: [], examples: [], vault: { title: "", columns: ["หัวข้อ", "รายละเอียด"], rows: [] }, questions: [],
});

/* ─── buildMergedUnits ──────────────────────────────────────────── */
function buildMergedUnits(custom) {
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

/* ─── StatusDot ──────────────────────────────────────────────────── */
function StatusDot({ cat }) {
  if (!cat) return <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#d8d2c2" }} title="ยังไม่มีเนื้อหา" />;
  const full = cat.rules.length > 0 && cat.questions.length > 0;
  const partial = cat.rules.length > 0 || cat.questions.length > 0;
  const color = full ? "#2E8B57" : partial ? "#E8A838" : "#c7c1b0";
  const label = full ? "มีเนื้อหา" : partial ? "ยังไม่ครบ" : "ว่างเปล่า";
  return <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} title={label} />;
}

/* ─── NewCategoryModal ──────────────────────────────────────────── */
function NewCategoryModal({ onAdd, onDismiss, existingIds }) {
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newIcon, setNewIcon] = useState("BookOpen");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const id = newId.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    if (!id) { setError("กรุณาใส่ ID หมวด"); return; }
    if (existingIds.includes(id)) { setError(`ID "${id}" ซ้ำกับที่มีอยู่แล้ว`); return; }
    if (!newName.trim()) { setError("กรุณาใส่ชื่อหมวด"); return; }
    onAdd(id, { name: newName.trim(), tagline: newTagline.trim(), iconName: newIcon });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(31,42,68,0.5)" }} onClick={onDismiss}>
      <div className="w-full max-w-md p-5 border-2" style={{ borderColor: "var(--ink)", background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>สร้างหมวดใหม่</p>
          <button onClick={onDismiss} className="p-1"><X size={18} color="var(--ink)" /></button>
        </div>
        {error && <p className="text-xs mb-3 px-2.5 py-1.5" style={{ color: "var(--wrong)", background: "#fbeceb" }}>{error}</p>}
        <div className="space-y-2.5 mb-4">
          <div>
            <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>ID หมวด</label>
            <input value={newId} onChange={(e) => { setNewId(e.target.value); setError(""); }} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="เช่น modal, passive" />
          </div>
          <div>
            <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>ชื่อหมวด</label>
            <input value={newName} onChange={(e) => { setNewName(e.target.value); setError(""); }} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600 }} placeholder="เช่น Modal Verbs" />
          </div>
          <div>
            <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>คำโปรย (ไม่บังคับ)</label>
            <input value={newTagline} onChange={(e) => setNewTagline(e.target.value)} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="คำโปรยสั้น ๆ" />
          </div>
        </div>
        <p className="text-[11px] font-bold mb-2" style={{ color: "#8b8f9e" }}>เลือกไอคอน</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.entries(BUILTIN_ICONS).map(([name, Icon]) => (
            <button key={name} onClick={() => setNewIcon(name)} className="w-9 h-9 flex items-center justify-center border-2" style={{ borderColor: newIcon === name ? "var(--teal)" : "#d8d2c2", background: newIcon === name ? "#e8f3f1" : "#fff" }} title={name}>
              <Icon size={16} color={newIcon === name ? "var(--teal)" : "var(--ink)"} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={handleSubmit} className="flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background: "var(--teal)", color: "#fff", fontFamily: "var(--font-display)" }}>
            <Plus size={14} /> สร้างหมวดนี้
          </button>
          <button onClick={onDismiss} className="px-5 py-2.5 text-sm font-semibold border-2" style={{ borderColor: "#d8d2c2", color: "#8b8f9e", background: "#fff" }}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
}

/* ─── AddTopicModal ─────────────────────────────────────────────── */
function AddTopicModal({ onAdd, onDismiss }) {
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!label.trim()) { setError("กรุณาใส่ชื่อเรื่องย่อย"); return; }
    const id = "custom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
    onAdd({ id, label: label.trim(), cat: cat.trim() || undefined });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(31,42,68,0.5)" }} onClick={onDismiss}>
      <div className="w-full max-w-md p-5 border-2" style={{ borderColor: "var(--ink)", background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>เพิ่มเรื่องย่อย</p>
          <button onClick={onDismiss} className="p-1"><X size={18} color="var(--ink)" /></button>
        </div>
        {error && <p className="text-xs mb-3 px-2.5 py-1.5" style={{ color: "var(--wrong)", background: "#fbeceb" }}>{error}</p>}
        <div className="space-y-2.5 mb-4">
          <div>
            <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>ชื่อเรื่องย่อย</label>
            <input value={label} onChange={(e) => { setLabel(e.target.value); setError(""); }} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="เช่น Passive Voice" />
          </div>
          <div>
            <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>เชื่อมกับหมวด (ไม่บังคับ)</label>
            <input value={cat} onChange={(e) => setCat(e.target.value)} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="ใส่ cat ID ถ้ามีแล้ว เช่น do, agree" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSubmit} className="flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background: "var(--teal)", color: "#fff", fontFamily: "var(--font-display)" }}>
            <Plus size={14} /> เพิ่ม
          </button>
          <button onClick={onDismiss} className="px-5 py-2.5 text-sm font-semibold border-2" style={{ borderColor: "#d8d2c2", color: "#8b8f9e", background: "#fff" }}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
}

/* ─── TabInfo ────────────────────────────────────────────────────── */
function TabInfo({ cat, patchCat }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>ชื่อหมวด</label>
        <input value={cat.name} onChange={(e) => patchCat({ name: e.target.value })} className="w-full text-sm px-3 py-2.5 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }} />
      </div>
      <div>
        <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>คำโปรย</label>
        <input value={cat.tagline} onChange={(e) => patchCat({ tagline: e.target.value })} className="w-full text-sm px-3 py-2.5 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="คำโปรยสั้น ๆ" />
      </div>
    </div>
  );
}

/* ─── TabTeach ───────────────────────────────────────────────────── */
function TabTeach({ cat, patchCat }) {
  const pairs = Math.max(cat.rules.length, cat.examples.length);
  const updateRule = (i, val) => {
    const rules = [...cat.rules]; while (rules.length <= i) rules.push(""); rules[i] = val; patchCat({ rules });
  };
  const addPair = () => patchCat({ rules: [...cat.rules, ""], examples: [...cat.examples, { wrong: "", right: "" }] });
  const removePair = (i) => patchCat({ rules: cat.rules.filter((_, idx) => idx !== i), examples: cat.examples.filter((_, idx) => idx !== i) });
  const updateExample = (i, field, val) => {
    const examples = [...cat.examples]; while (examples.length <= i) examples.push({ wrong: "", right: "" });
    examples[i] = { ...examples[i], [field]: val }; patchCat({ examples });
  };

  return (
    <div>
      <p className="text-xs mb-4 leading-relaxed" style={{ color: "#8b8f9e" }}>แต่ละคู่จะแสดงเป็น "จำไว้นะ" 1 ใบ — กฎอยู่ด้านบน ตัวอย่างผิด/ถูกอยู่ด้านล่าง</p>
      {pairs === 0 && <div className="text-center py-8"><p className="text-sm" style={{ color: "#8b8f9e" }}>ยังไม่มีคู่规则+ตัวอย่าง</p></div>}
      <div className="space-y-3 mb-4">
        {Array.from({ length: pairs }).map((_, i) => (
          <div key={i} className="border-2 p-3.5" style={{ borderColor: "#e5ded0", background: "#faf8f2" }}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold px-2 py-0.5" style={{ color: "var(--teal)", background: "#e8f3f1", borderRadius: 3 }}>คู่ที่ {i + 1}</span>
              <button onClick={() => removePair(i)} className="p-1 border" style={{ borderColor: "#d8d2c2", background: "#fff" }}><Trash2 size={12} color="var(--wrong)" /></button>
            </div>
            <div className="mb-3">
              <label className="text-[10px] font-bold mb-1 flex items-center gap-1" style={{ color: "var(--teal)" }}><BookOpen size={10} /> กฎ</label>
              <textarea value={cat.rules[i] || ""} onChange={(e) => updateRule(i, e.target.value)} rows={2} className="w-full text-sm px-3 py-2 border resize-y focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="เช่น Do คู่กับ I/You/We/They..." />
            </div>
            <div>
              <label className="text-[10px] font-bold mb-1 block" style={{ color: "#5b6178" }}>ตัวอย่าง</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold block mb-0.5" style={{ color: "var(--wrong)" }}>ผิด</span>
                  <input value={(cat.examples[i] || {}).wrong || ""} onChange={(e) => updateExample(i, "wrong", e.target.value)} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#e5b8b8", color: "var(--ink)" }} placeholder="She don't like coffee." />
                </div>
                <div>
                  <span className="text-[10px] font-bold block mb-0.5" style={{ color: "var(--correct)" }}>ถูก</span>
                  <input value={(cat.examples[i] || {}).right || ""} onChange={(e) => updateExample(i, "right", e.target.value)} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#b8d8c2", color: "var(--ink)" }} placeholder="She doesn't like coffee." />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addPair} className="w-full py-2.5 text-sm font-semibold border-2 border-dashed flex items-center justify-center gap-1.5" style={{ borderColor: "var(--teal)", color: "var(--teal)", background: "#fff", fontFamily: "var(--font-display)" }}>
        <Plus size={14} /> เพิ่มคู่规则+ตัวอย่าง
      </button>
    </div>
  );
}

/* ─── TabVault ───────────────────────────────────────────────────── */
function TabVault({ cat, patchCat }) {
  const setVault = (patch) => patchCat({ vault: { ...cat.vault, ...patch } });
  const setVaultColumns = (cols) => {
    const rows = cat.vault.rows.map((r) => { const row = r.slice(0, cols.length); while (row.length < cols.length) row.push(""); return row; });
    setVault({ columns: cols, rows });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-[11px] font-bold mb-1 block" style={{ color: "#8b8f9e" }}>ชื่อตาราง</label>
        <input value={cat.vault.title} onChange={(e) => setVault({ title: e.target.value })} className="w-full text-sm px-3 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)", fontWeight: 600 }} placeholder="ชื่อตาราง" />
      </div>
      <div className="mb-2">
        <label className="text-[11px] font-bold mb-1.5 block" style={{ color: "#8b8f9e" }}>คอลัมน์</label>
        <div className="flex flex-wrap gap-2 items-center">
          {cat.vault.columns.map((col, ci) => (
            <div key={ci} className="flex gap-1 items-center" style={{ minWidth: 120 }}>
              <input value={col} onChange={(e) => setVaultColumns(cat.vault.columns.map((c, i) => (i === ci ? e.target.value : c)))} className="flex-1 text-sm px-2 py-1.5 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)", fontWeight: 600 }} />
              {cat.vault.columns.length > 1 && <button onClick={() => setVaultColumns(cat.vault.columns.filter((_, i) => i !== ci))} className="p-1 border shrink-0" style={{ borderColor: "#d8d2c2", background: "#fff" }}><Trash2 size={11} color="#8b8f9e" /></button>}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="text-[11px] font-bold mb-1.5 block" style={{ color: "#8b8f9e" }}>ข้อมูลในตาราง</label>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {cat.vault.columns.map((col, ci) => (
                  <th key={ci} className="text-left px-2 py-1.5 border font-semibold text-[11px]" style={{ borderColor: "#d8d2c2", color: "var(--ink)", background: "#f5f3ed" }}>{col || `คอลัมน์ ${ci + 1}`}</th>
                ))}
                <th className="w-8 border" style={{ borderColor: "#d8d2c2" }}></th>
              </tr>
            </thead>
            <tbody>
              {cat.vault.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-1 py-0.5 border" style={{ borderColor: "#d8d2c2" }}>
                      <input value={cell} onChange={(e) => setVault({ rows: cat.vault.rows.map((r, i) => i === ri ? r.map((c, j) => (j === ci ? e.target.value : c)) : r) })} className="w-full text-sm px-2 py-1.5 border-0 focus:outline-none bg-transparent" style={{ color: "var(--ink)" }} />
                    </td>
                  ))}
                  <td className="px-1 py-0.5 border text-center" style={{ borderColor: "#d8d2c2" }}>
                    <button onClick={() => setVault({ rows: cat.vault.rows.filter((_, i) => i !== ri) })} className="p-1"><Trash2 size={11} color="var(--wrong)" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setVault({ rows: [...cat.vault.rows, cat.vault.columns.map(() => "")] })} className="flex-1 py-2 text-sm font-semibold border-2 border-dashed flex items-center justify-center gap-1" style={{ borderColor: "#c7c1b0", color: "var(--teal)", background: "#fff" }}><Plus size={13} /> เพิ่มแถว</button>
        <button onClick={() => setVaultColumns([...cat.vault.columns, ""])} className="flex-1 py-2 text-sm font-semibold border-2 border-dashed flex items-center justify-center gap-1" style={{ borderColor: "#c7c1b0", color: "var(--teal)", background: "#fff" }}><Plus size={13} /> เพิ่มคอลัมน์</button>
      </div>
    </div>
  );
}

/* ─── TabQuestions ───────────────────────────────────────────────── */
function TabQuestions({ cat, patchCat }) {
  const addQ = () => patchCat({ questions: [...cat.questions, { prompt: "", options: ["", "", "", ""], correct: 0, explanation: "" }] });
  const removeQ = (qi) => patchCat({ questions: cat.questions.filter((_, i) => i !== qi) });
  const updateQ = (qi, patch) => patchCat({ questions: cat.questions.map((q, i) => (i === qi ? { ...q, ...patch } : q)) });
  const setOption = (qi, oi, val) => {
    const q = cat.questions[qi]; updateQ(qi, { options: q.options.map((o, i) => (i === oi ? val : o)) });
  };
  const addOption = (qi) => { const q = cat.questions[qi]; if (q.options.length >= 6) return; updateQ(qi, { options: [...q.options, ""] }); };
  const delOption = (qi, oi) => {
    const q = cat.questions[qi]; if (q.options.length <= 2) return;
    const options = q.options.filter((_, i) => i !== oi); let correct = q.correct;
    if (oi === correct) correct = 0; else if (oi < correct) correct -= 1;
    updateQ(qi, { options, correct });
  };

  return (
    <div>
      {cat.questions.length === 0 && <p className="text-sm text-center py-6" style={{ color: "#8b8f9e" }}>ยังไม่มีข้อสอบ</p>}
      <div className="space-y-3 mb-3">
        {cat.questions.map((q, qi) => (
          <div key={qi} className="border-2 p-3" style={{ borderColor: "#e5ded0", background: "#faf8f2" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold" style={{ color: "var(--ink)" }}>ข้อ {qi + 1}</span>
              <button onClick={() => removeQ(qi)} className="p-1 border" style={{ borderColor: "#d8d2c2", background: "#fff" }}><Trash2 size={12} color="var(--wrong)" /></button>
            </div>
            <textarea value={q.prompt} onChange={(e) => updateQ(qi, { prompt: e.target.value })} rows={2} className="w-full text-sm px-3 py-2 border resize-y focus:outline-none mb-2" style={{ borderColor: "#d8d2c2", color: "var(--ink)", fontWeight: 500 }} placeholder="โจทย์คำถาม" />
            <div className="space-y-1.5 mb-2">
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex gap-1.5 items-center">
                  <label className="flex items-center gap-1.5 flex-1 cursor-pointer">
                    <input type="radio" name={`q-${qi}`} checked={q.correct === oi} onChange={() => updateQ(qi, { correct: oi })} style={{ accentColor: "var(--teal)" }} />
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: q.correct === oi ? "var(--teal)" : "#e5ded0", color: q.correct === oi ? "#fff" : "#8b8f9e" }}>{String.fromCharCode(65 + oi)}</span>
                    <input value={opt} onChange={(e) => setOption(qi, oi, e.target.value)} className="flex-1 text-sm px-2 py-1.5 border focus:outline-none" style={{ borderColor: q.correct === oi ? "var(--teal)" : "#d8d2c2", background: q.correct === oi ? "#e8f3f1" : "#fff", color: "var(--ink)" }} placeholder={"ตัวเลือก " + String.fromCharCode(65 + oi)} />
                  </label>
                  {q.options.length > 2 && <button onClick={() => delOption(qi, oi)} className="p-1 border shrink-0" style={{ borderColor: "#d8d2c2", background: "#fff" }}><Trash2 size={10} color="#8b8f9e" /></button>}
                </div>
              ))}
            </div>
            {q.options.length < 6 && <button onClick={() => addOption(qi)} className="w-full py-1 text-xs font-semibold border border-dashed flex items-center justify-center gap-1 mb-2" style={{ borderColor: "#c7c1b0", color: "var(--teal)", background: "#fff" }}><Plus size={11} /> เพิ่มตัวเลือก</button>}
            <textarea value={q.explanation} onChange={(e) => updateQ(qi, { explanation: e.target.value })} rows={2} className="w-full text-xs px-3 py-2 border resize-y focus:outline-none" style={{ borderColor: "#d8d2c2", color: "#5b6178" }} placeholder="คำอธิบายเฉลย" />
            <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: "1px solid #f0ece2" }}>
              <span className="text-[11px] font-semibold" style={{ color: "var(--ink)" }}>ตำแหน่งหลัง Teach Card ที่:</span>
              <input type="number" min={1} max={Math.max(cat.rules.length, 1)} value={q.position || 1} onChange={(e) => updateQ(qi, { position: Math.max(1, parseInt(e.target.value) || 1) })} className="w-14 text-xs px-2 py-1 border text-center focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} />
              <span className="text-[10px]" style={{ color: "#8b8f9e" }}>({cat.rules.length} teach card{cat.rules.length > 1 ? "s" : ""})</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addQ} className="w-full py-2.5 text-sm font-semibold border-2 border-dashed flex items-center justify-center gap-1" style={{ borderColor: "#c7c1b0", color: "var(--teal)", background: "#fff" }}><Plus size={14} /> เพิ่มคำถาม</button>
    </div>
  );
}

/* ─── EditorPanel ────────────────────────────────────────────────── */
function EditorPanel({ cat, activeTab, setActiveTab, patchCat, onDelete }) {
  if (!cat) return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ background: "#e5ded0" }}><BookOpen size={32} color="#b5ae9c" /></div>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>เลือกเรื่องย่อยทางซ้ายเพื่อแก้ไข</p>
      <p className="text-xs" style={{ color: "#8b8f9e" }}>คลิกที่ชื่อเรื่องย่อยเพื่อเริ่มแก้ไขเนื้อหา</p>
    </div>
  );
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-3 border-b-2 shrink-0" style={{ borderColor: "#e5ded0" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <StatusDot cat={cat} />
            <h2 className="text-lg font-semibold truncate" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>{cat.name}</h2>
          </div>
          {onDelete && (
            <button onClick={() => { if (window.confirm(`ลบหมวด "${cat.name}"?`)) onDelete(); }} className="p-1.5 shrink-0 border-2" style={{ borderColor: "#e5b8b8", background: "#fff" }} title="ลบหมวดนี้">
              <Trash2 size={14} color="var(--wrong)" />
            </button>
          )}
        </div>
        {cat.tagline && <p className="text-xs" style={{ color: "#8b8f9e" }}>{cat.tagline}</p>}
      </div>
      <div className="flex gap-0 px-5 border-b-2 shrink-0 overflow-x-auto" style={{ borderColor: "#e5ded0" }}>
        {TAB_LIST.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="px-3 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 -mb-[2px] transition-colors" style={{ borderColor: activeTab === tab ? "var(--teal)" : "transparent", color: activeTab === tab ? "var(--teal)" : "#8b8f9e", fontFamily: "var(--font-display)" }}>{TAB_LABELS[tab]}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activeTab === "info" && <TabInfo cat={cat} patchCat={patchCat} />}
        {activeTab === "teach" && <TabTeach cat={cat} patchCat={patchCat} />}
        {activeTab === "vault" && <TabVault cat={cat} patchCat={patchCat} />}
        {activeTab === "questions" && <TabQuestions cat={cat} patchCat={patchCat} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/* ContentManager (root)                                              */
/* ═══════════════════════════════════════════════════════════════════ */
export default function ContentManager({ content, onChange, customUnits, onChangeUnits, onExit }) {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [search, setSearch] = useState("");
  const setCustomUnits = onChangeUnits;
  const [expandedUnits, setExpandedUnits] = useState(() => {
    const m = {}; UNITS.forEach((u) => { m[u.id] = true; }); return m;
  });
  const [showNewModal, setShowNewModal] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(null); // unitId | null
  const [editingUnitTitle, setEditingUnitTitle] = useState(null);
  const [editingTopicLabel, setEditingTopicLabel] = useState(null);
  const [unitTitleDraft, setUnitTitleDraft] = useState("");
  const [topicLabelDraft, setTopicLabelDraft] = useState("");
  const [mobileView, setMobileView] = useState("list");
  const fileRef = useRef(null);

  const units = buildMergedUnits(customUnits);
  const allCatIds = Object.keys(content);
  const totalQuestions = allCatIds.reduce((n, id) => n + (content[id]?.questions?.length || 0), 0);
  const toggleUnit = (uid) => setExpandedUnits((p) => ({ ...p, [uid]: !p[uid] }));
  const matchesSearch = (text) => !search.trim() || text.toLowerCase().includes(search.toLowerCase());

  const patchCat = useCallback((id, patch) => {
    onChange({ ...content, [id]: { ...content[id], ...patch } });
  }, [content, onChange]);

  const handleAddCategory = (id, { name }) => {
    onChange({ ...content, [id]: emptyCat(id, name) });
    setShowNewModal(false); setSelectedId(id); setActiveTab("info"); setMobileView("editor");
  };
  const handleDeleteCategory = (id) => {
    if (!window.confirm(`ลบหมวด "${content[id]?.name}" ออกเลย?`)) return;
    const next = { ...content }; delete next[id]; onChange(next);
    if (selectedId === id) { setSelectedId(null); setMobileView("list"); }
  };
  const handleSelect = (id) => { setSelectedId(id); setActiveTab("info"); setMobileView("editor"); };

  /* ── Activate locked topic (create cat + open editor) ──────── */
  const contentRef = useRef(content);
  contentRef.current = content;

  const handleActivateTopic = (unitId, topic) => {
    const catId = topic.id;
    // 1. สร้าง category ใน content (อ่านค่าล่าสุดจาก ref)
    const latest = contentRef.current;
    if (!latest[catId]) {
      onChange({ ...latest, [catId]: emptyCat(catId, topic.label) });
    }
    // 2. เพิ่ม cat ให้ topic ใน customUnits
    setCustomUnits((prev) => {
      const unitData = prev[unitId] || { title: units.find((u) => u.id === unitId)?.title || "", topics: [] };
      const topics = (unitData.topics || []).map((t) => t.id === topic.id ? { ...t, cat: catId } : t);
      return { ...prev, [unitId]: { ...unitData, topics } };
    });
    // 3. เปิด editor
    setSelectedId(catId); setActiveTab("info"); setMobileView("editor");
  };

  /* ── Unit CRUD ──────────────────────────────────────────────── */
  const startEditUnit = (uid, title) => { setEditingUnitTitle(uid); setUnitTitleDraft(title); };
  const saveEditUnit = () => {
    if (!editingUnitTitle || !unitTitleDraft.trim()) return;
    setCustomUnits((p) => ({ ...p, [editingUnitTitle]: { ...(p[editingUnitTitle] || {}), title: unitTitleDraft.trim() } }));
    setEditingUnitTitle(null);
  };

  const handleDeleteUnit = (unitId) => {
    const unit = units.find((u) => u.id === unitId);
    if (!unit) return;
    if (UNITS.some((u) => u.id === unitId)) {
      alert("ลบหน่วยหลักไม่ได้ — แค่ลบ/แก้ไขเรื่องย่อยได้");
      return;
    }
    if (!window.confirm(`ลบหน่วย "${unit.title}" ออกเลย?`)) return;
    unit.topics.forEach((t) => {
      if (t.cat && content[t.cat]) { const next = { ...content }; delete next[t.cat]; onChange(next); }
    });
    setCustomUnits((p) => { const n = { ...p }; delete n[unitId]; return n; });
  };

  const handleAddUnit = () => {
    const id = "unit-" + Date.now();
    setCustomUnits((p) => ({ ...p, [id]: { title: "หน่วยใหม่", topics: [] } }));
    setExpandedUnits((p) => ({ ...p, [id]: true }));
    setEditingUnitTitle(id); setUnitTitleDraft("หน่วยใหม่");
  };

  /* ── Topic CRUD ─────────────────────────────────────────────── */
  const handleAddTopic = (unitId, topic) => {
    const unitData = customUnits[unitId] || { title: units.find((u) => u.id === unitId)?.title || "", topics: [] };
    const existingTopics = unitData.topics || units.find((u) => u.id === unitId)?.topics || [];
    setCustomUnits((p) => ({ ...p, [unitId]: { ...unitData, topics: [...existingTopics, topic] } }));
    if (topic.cat && !content[topic.cat]) {
      onChange({ ...content, [topic.cat]: emptyCat(topic.cat, topic.label) });
    }
    setShowAddTopic(null);
  };

  const startEditTopic = (topicId, label) => { setEditingTopicLabel(topicId); setTopicLabelDraft(label); };
  const saveEditTopic = (unitId, topic) => {
    if (!topicLabelDraft.trim()) return;
    setCustomUnits((p) => {
      const unitTopics = p[unitId]?.topics || units.find((u) => u.id === unitId)?.topics || [];
      const updated = unitTopics.map((t) => t.id === topic.id ? { ...t, label: topicLabelDraft.trim() } : t);
      return { ...p, [unitId]: { ...(p[unitId] || {}), topics: updated } };
    });
    if (topic.cat && content[topic.cat]) patchCat(topic.cat, { name: topicLabelDraft.trim() });
    setEditingTopicLabel(null); setTopicLabelDraft("");
  };

  const handleDeleteTopic = (unitId, topic) => {
    if (!window.confirm(`ลบ "${topic.label}" ออกเลย?`)) return;
    if (topic.cat && content[topic.cat]) {
      const next = { ...content }; delete next[topic.cat]; onChange(next);
    }
    setCustomUnits((p) => {
      const unitTopics = p[unitId]?.topics || units.find((u) => u.id === unitId)?.topics || [];
      const updated = unitTopics.filter((t) => t.id !== topic.id);
      return { ...p, [unitId]: { ...(p[unitId] || {}), topics: updated } };
    });
    if (selectedId === topic.cat) { setSelectedId(null); setMobileView("list"); }
  };

  /* ── Export / Import / Reset ────────────────────────────────── */
  const handleExport = () => {
    const blob = new Blob([exportContent(content)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    const now = new Date(); const pad = (n) => String(n).padStart(2, "0");
    a.href = url;
    a.download = `flowenglish-content-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}.json`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  const handleImportFile = async (e) => {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    try { onChange(importContent(await file.text())); } catch (err) { window.alert("ไฟล์ไม่ถูกต้อง: " + err.message); }
  };
  const handleReset = () => {
    if (!window.confirm("ล้างการแก้ไขทั้งหมด?")) return;
    onChange(resetContent()); setCustomUnits({});
  };

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        pushRemoteContent(content),
        pushRemoteUnits(customUnits),
        pushRemoteProgress(JSON.parse(localStorage.getItem("flowenglish.progress.v1") || "{}")),
      ]);
      window.alert("บันทึกสำเร็จ!");
    } catch {
      window.alert("บันทึกไม่สำเร็จ — ลองใหม่อีกครั้ง");
    }
    setSaving(false);
  };

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      {/* mobile header */}
      <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b-2 shrink-0" style={{ borderColor: "#e5ded0", background: "#fff" }}>
        {mobileView === "editor" && selectedId && <button onClick={() => setMobileView("list")} className="p-1"><ArrowLeft size={20} color="var(--ink)" /></button>}
        <h1 className="text-base font-semibold" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>{mobileView === "editor" && selectedId ? content[selectedId]?.name : "จัดการเนื้อหา"}</h1>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* ─── Left panel ──────────────────────────────────────── */}
        <div className={`w-full md:w-80 shrink-0 flex flex-col border-r-2 overflow-hidden ${mobileView === "editor" ? "hidden md:flex" : "flex"}`} style={{ borderColor: "#e5ded0", background: "#fff" }}>
          {/* header / tools */}
          <div className="px-4 pt-4 pb-3 border-b shrink-0" style={{ borderColor: "#f0ece2" }}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={onExit} className="p-1 -ml-1" aria-label="กลับ"><ArrowLeft size={20} color="var(--ink)" /></button>
              <h1 className="text-sm font-semibold flex-1 text-center" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>จัดการเนื้อหา</h1>
              <div className="w-6" />
            </div>
            <div className="relative mb-2">
              <Search size={14} color="#8b8f9e" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full text-xs pl-7 pr-2.5 py-2 border focus:outline-none" style={{ borderColor: "#d8d2c2", color: "var(--ink)" }} placeholder="ค้นหาหัวข้อ..." />
            </div>
            <div className="flex gap-1.5">
              <button onClick={handleExport} className="flex-1 py-1.5 text-[11px] font-semibold border flex items-center justify-center gap-1" style={{ borderColor: "#d8d2c2", color: "var(--ink)", background: "#fff" }}><Download size={12} /> Export</button>
              <button onClick={() => fileRef.current?.click()} className="flex-1 py-1.5 text-[11px] font-semibold border flex items-center justify-center gap-1" style={{ borderColor: "#d8d2c2", color: "var(--ink)", background: "#fff" }}><Upload size={12} /> Import</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-1.5 text-[11px] font-semibold border flex items-center justify-center gap-1" style={{ borderColor: "var(--teal)", color: saving ? "#8b8f9e" : "var(--teal)", background: "#fff" }}><Save size={12} /> {saving ? "กำลังบันทึก..." : "Save"}</button>
              <button onClick={handleReset} className="px-2 py-1.5 border flex items-center justify-center" style={{ borderColor: "#e5b8b8", color: "var(--wrong)", background: "#fff" }} title="รีเซ็ต"><RotateCcw size={12} /></button>
              <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
            </div>
            <div className="mt-2 text-[10px]" style={{ color: "#8b8f9e" }}>{allCatIds.length} หมวด · {totalQuestions} ข้อสอบ · บันทึกอัตโนมัติ + กด Save เพื่อ sync</div>
          </div>

          {/* units list */}
          <div className="flex-1 overflow-y-auto">
            {units.map((unit) => {
              const expanded = !!expandedUnits[unit.id];
              const visibleTopics = unit.topics.filter((t) => matchesSearch(t.label) || (t.cat && content[t.cat]?.name && matchesSearch(content[t.cat].name)));
              if (visibleTopics.length === 0 && search.trim()) return null;
              const hasContent = visibleTopics.filter((t) => t.cat && content[t.cat]).length;
              const isBase = UNITS.some((u) => u.id === unit.id);
              const isEditingTitle = editingUnitTitle === unit.id;

              return (
                <div key={unit.id} className="border-b" style={{ borderColor: "#f0ece2" }}>
                  {/* unit header */}
                  <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: expanded ? "#faf8f2" : "#fff" }}>
                    <button onClick={() => toggleUnit(unit.id)} className="flex items-center gap-2 flex-1 text-left min-w-0">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold" style={{ background: "var(--ink)", color: "#fff" }}>{unit.no}</div>
                      <div className="min-w-0 flex-1">
                        {isEditingTitle ? (
                          <input autoFocus value={unitTitleDraft} onChange={(e) => setUnitTitleDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEditUnit(); if (e.key === "Escape") setEditingUnitTitle(null); }} onBlur={saveEditUnit} className="w-full text-xs font-semibold px-1 py-0.5 border focus:outline-none" style={{ borderColor: "var(--teal)", color: "var(--ink)", fontFamily: "var(--font-display)" }} />
                        ) : (
                          <p className="text-xs font-semibold truncate" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>{unit.title}</p>
                        )}
                        <p className="text-[10px]" style={{ color: "#8b8f9e" }}>{hasContent}/{visibleTopics.length} เรื่องย่อย</p>
                      </div>
                    </button>
                    <button onClick={() => startEditUnit(unit.id, unit.title)} className="p-1 shrink-0" title="แก้ไขชื่อ"><Pencil size={12} color="#8b8f9e" /></button>
                    {!isBase && visibleTopics.length === 0 && <button onClick={() => handleDeleteUnit(unit.id)} className="p-1 shrink-0" title="ลบหน่วย"><Trash2 size={12} color="var(--wrong)" /></button>}
                  </div>

                  {/* topics */}
                  {expanded && (
                    <div>
                      {visibleTopics.map((topic) => {
                        const cat = topic.cat ? content[topic.cat] : null;
                        const isActive = selectedId === topic.cat;
                        const isEditing = editingTopicLabel === topic.id;

                        if (!topic.cat) return (
                          <button key={topic.id} onClick={() => handleActivateTopic(unit.id, topic)} className="w-full flex items-center gap-2 pl-12 pr-3 py-2 text-left border-b transition-colors group" style={{ borderColor: "#f5f2ec", background: "#fff" }}>
                            <Lock size={12} color="#d8d2c2" />
                            {isEditing ? (
                              <input autoFocus value={topicLabelDraft} onChange={(e) => setTopicLabelDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEditTopic(unit.id, topic); if (e.key === "Escape") setEditingTopicLabel(null); }} onBlur={() => saveEditTopic(unit.id, topic)} onClick={(e) => e.stopPropagation()} className="flex-1 text-xs px-1 py-0.5 border focus:outline-none" style={{ borderColor: "var(--teal)", color: "var(--ink)" }} />
                            ) : (
                              <span className="text-xs truncate flex-1" style={{ color: "#d8d2c2" }}>{topic.label}</span>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); startEditTopic(topic.id, topic.label); }} className="p-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><Pencil size={10} color="#8b8f9e" /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteTopic(unit.id, topic); }} className="p-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={10} color="var(--wrong)" /></button>
                            <span className="text-[9px] shrink-0 px-1.5 py-0.5" style={{ color: "var(--teal)", background: "#e8f3f1", borderRadius: 3 }}>เพิ่มเนื้อหา</span>
                          </button>
                        );

                        return (
                          <button key={topic.id} onClick={() => handleSelect(topic.cat)} className="w-full flex items-center gap-2 pl-12 pr-3 py-2 text-left border-b transition-colors group" style={{ borderColor: "#f5f2ec", background: isActive ? "#e8f3f1" : "#fff" }}>
                            <StatusDot cat={cat} />
                            <div className="min-w-0 flex-1">
                              {isEditing ? (
                                <input autoFocus value={topicLabelDraft} onChange={(e) => setTopicLabelDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEditTopic(unit.id, topic); if (e.key === "Escape") setEditingTopicLabel(null); }} onBlur={() => saveEditTopic(unit.id, topic)} onClick={(e) => e.stopPropagation()} className="w-full text-xs font-medium px-1 py-0.5 border focus:outline-none" style={{ borderColor: "var(--teal)", color: "var(--ink)" }} />
                              ) : (
                                <span className="text-xs font-medium truncate block" style={{ color: isActive ? "var(--teal)" : "var(--ink)" }}>{topic.label}</span>
                              )}
                              {cat && <span className="text-[10px]" style={{ color: "#8b8f9e" }}>{cat.questions.length} ข้อ · {cat.rules.length} กฎ</span>}
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); startEditTopic(topic.id, topic.label); }} className="p-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><Pencil size={11} color="#8b8f9e" /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteTopic(unit.id, topic); }} className="p-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={11} color="var(--wrong)" /></button>
                            <ChevronRight size={12} color={isActive ? "var(--teal)" : "#c7c1b0"} />
                          </button>
                        );
                      })}

                      {/* add topic button */}
                      <button onClick={() => setShowAddTopic(unit.id)} className="w-full flex items-center gap-2 pl-12 pr-3 py-2 text-left border-b border-dashed transition-colors" style={{ borderColor: "#d8d2c2", color: "var(--teal)" }}>
                        <Plus size={12} />
                        <span className="text-xs font-semibold">เพิ่มเรื่องย่อย</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* bottom buttons */}
          <div className="px-4 py-3 border-t shrink-0 space-y-2" style={{ borderColor: "#f0ece2", background: "#fff" }}>
            <button onClick={() => setShowNewModal(true)} className="w-full py-2.5 text-sm font-semibold border-2 border-dashed flex items-center justify-center gap-1.5" style={{ borderColor: "var(--teal)", color: "var(--teal)", background: "#fff", fontFamily: "var(--font-display)" }}>
              <Plus size={14} /> สร้างหมวดใหม่
            </button>
            <button onClick={handleAddUnit} className="w-full py-2 text-xs font-semibold border-2 border-dashed flex items-center justify-center gap-1.5" style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "#fff", fontFamily: "var(--font-display)" }}>
              <Plus size={12} /> สร้างหน่วยใหม่
            </button>
          </div>
        </div>

        {/* ─── Editor panel ───────────────────────────────────── */}
        <div className={`flex-1 min-w-0 ${mobileView === "list" ? "hidden md:block" : "block"}`} style={{ background: "var(--paper)" }}>
          <EditorPanel
            cat={selectedId ? content[selectedId] : null}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            patchCat={(patch) => patchCat(selectedId, patch)}
            onDelete={selectedId ? () => handleDeleteCategory(selectedId) : null}
          />
        </div>
      </div>

      {/* ─── Modals ─────────────────────────────────────────────── */}
      {showNewModal && <NewCategoryModal onAdd={handleAddCategory} onDismiss={() => setShowNewModal(false)} existingIds={allCatIds} />}
      {showAddTopic && <AddTopicModal onAdd={(topic) => handleAddTopic(showAddTopic, topic)} onDismiss={() => setShowAddTopic(null)} />}
    </div>
  );
}
