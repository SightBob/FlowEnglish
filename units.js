/* ------------------------------------------------------------------ */
/* UNITS DATA — ข้อมูลกลางสำหรับทั้งหน้าเรียนและหน้าจัดการเนื้อหา           */
/* หน่วยเรียน 13 หน่วย แต่ละหน่วยมี "เรื่องย่อย" เป็นด่านบนเส้นทาง        */
/* topic ที่มี `cat` = มีเนื้อหาจริงแล้ว (ชี้ไปยัง category ใน content.js) */
/* topic ที่ไม่มี cat = ยังไม่มีเนื้อหา แสดงเป็นด่านล็อก                 */
/* ------------------------------------------------------------------ */

export const UNITS = [
  {
    id: "u1",
    no: 1,
    title: "Auxiliaries & Verb Forms",
    planned: 20,
    topics: [
      { id: "t-do", label: "Do / Does / Did", cat: "do" },
      { id: "t-have", label: "Have / Has / Had (got)", cat: "have" },
      { id: "t-modal", label: "can / could / should / must", cat: "modal" },
      { id: "t-short", label: "Short answers (So do I)", cat: "short-answers" },
    ],
  },
  {
    id: "u2",
    no: 2,
    title: "Subject-Verb Agreement",
    planned: 5,
    topics: [
      { id: "t-sva", label: "ผัน verb ตามประธาน", cat: "agree" },
      { id: "t-neither", label: "Neither / Either of", cat: "sva-neither" },
    ],
  },
  {
    id: "u3",
    no: 3,
    title: "Questions & Polite Requests",
    planned: 14,
    topics: [
      { id: "t-wh", label: "Wh-questions", cat: "wh-q" },
      { id: "t-tags", label: "Question tags", cat: "qtag" },
      { id: "t-polite", label: "Could I..? / Would you..?", cat: "polite" },
    ],
  },
  {
    id: "u4",
    no: 4,
    title: "Tenses: Past / Perfect / Future",
    planned: 19,
    topics: [
      { id: "t-past", label: "Past simple", cat: "past" },
      { id: "t-presperf", label: "Present perfect", cat: "present-perfect" },
      { id: "t-pastperf", label: "Past perfect", cat: "past-perfect" },
      { id: "t-future", label: "Future (will / going to)", cat: "future" },
    ],
  },
  {
    id: "u5",
    no: 5,
    title: "Quantifiers & Pronouns",
    planned: 27,
    topics: [
      { id: "t-itthere", label: "it / there", cat: "it-there" },
      { id: "t-someany", label: "some / any / none / enough", cat: "some-any" },
      { id: "t-poss", label: "Possessive + reflexive", cat: "possessive" },
      { id: "t-obj", label: "Object pronoun", cat: "object-pronoun" },
    ],
  },
  {
    id: "u6",
    no: 6,
    title: "Prepositions & Phrasal Verbs",
    planned: 26,
    topics: [
      { id: "t-inonat", label: "in / on / at (Place)", cat: "prep" },
      { id: "t-sincefor", label: "since / for / ago", cat: "since-for" },
      { id: "t-phrasal", label: "Phrasal verbs", cat: "phrasal" },
      { id: "t-fixedprep", label: "prep + verb คงที่", cat: "fixed-prep" },
    ],
  },
  {
    id: "u7",
    no: 7,
    title: "Comparatives & Superlatives",
    planned: 5,
    topics: [
      { id: "t-comp", label: "ขั้นกว่า (-er / more)", cat: "comparative" },
      { id: "t-sup", label: "ขั้นสุด (-est / most)", cat: "superlative" },
      { id: "t-much", label: "much + comparative", cat: "much-comp" },
    ],
  },
  {
    id: "u8",
    no: 8,
    title: "Infinitive / Gerund / Verb Pattern",
    planned: 10,
    topics: [
      { id: "t-let", label: "let + V.1 (ไม่มี to)", cat: "let-v1" },
      { id: "t-toinf", label: "verb + to + V.1", cat: "to-inf" },
      { id: "t-preping", label: "prep + V-ing", cat: "prep-ing" },
      { id: "t-keep", label: "keep / get used to + V-ing", cat: "keep-ing" },
    ],
  },
  {
    id: "u9",
    no: 9,
    title: "Collocations & Conjunctions",
    planned: 19,
    topics: [
      { id: "t-conj", label: "and / or / but", cat: "and-or-but" },
      { id: "t-fixed", label: "Fixed phrases", cat: "fixed-phrase" },
      { id: "t-vprep", label: "Verb + prep", cat: "verb-prep" },
    ],
  },
  {
    id: "u10",
    no: 10,
    title: "Relative Clauses",
    planned: 4,
    topics: [{ id: "t-rel", label: "who / which / that / whose", cat: "relative" }],
  },
  {
    id: "u11",
    no: 11,
    title: "Conditionals & Passive Voice",
    planned: 7,
    topics: [
      { id: "t-if", label: "If-clause type 1 / 2", cat: "conditional" },
      { id: "t-passive", label: "Passive voice", cat: "passive" },
    ],
  },
  {
    id: "u12",
    no: 12,
    title: "Adverbs of Frequency",
    planned: 2,
    topics: [{ id: "t-freq", label: "always / usually / never", cat: "frequency" }],
  },
  {
    id: "u13",
    no: 13,
    title: "Subjunctive Mood",
    planned: 1,
    topics: [{ id: "t-subj", label: "suggest that + V.1", cat: "subjunctive" }],
  },
];
