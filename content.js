import {
  Zap, Clock, Package, MapPin, Scale, HelpCircle, BookOpen,
  PenLine, Sparkles, Star, Heart, Bookmark, Flag, Trophy, Link,
} from "lucide-react";

// ไอคอนสำเร็จรูปให้เลือกเวลาสร้างหมวดใหม่ (เลือกได้ในหน้าจัดการเนื้อหา)
export const BUILTIN_ICONS = {
  Zap, Clock, Package, MapPin, Scale, HelpCircle,
  BookOpen, PenLine, Sparkles, Star, Bookmark, Flag,
};

export const DEFAULT_CATEGORIES = {
  do: {
    id: "do",
    icon: Zap,
    name: "Do / Does / Did",
    tagline: "หัวหน้าแก๊งกริยาช่วย ตัวที่ออกสอบบ่อยที่สุด",
    rules: [
      "\u201CDo\u201D คู่กับประธาน I, You, We, They และพหูพจน์ทุกชนิด",
      "\u201CDoes\u201D คู่กับประธานเอกพจน์บุรุษที่ 3 คือ He, She, It เท่านั้น — กริยาหลักห้ามเติม s ซ้ำ",
      "\u201CDid\u201D คู่กับทุกประธานเมื่อพูดถึงอดีต — กริยาหลักต้องกลับเป็นช่องที่ 1 เสมอ",
    ],
    examples: [
      { wrong: "She don't like coffee.", right: "She doesn't like coffee." },
      { wrong: "Did you went there?", right: "Did you go there?" },
      { wrong: "Does they play football?", right: "Do they play football?" },
    ],
    vault: {
      title: "ตารางประธานคู่ Do-support",
      columns: ["ประธาน", "ใช้กับ", "ตัวอย่าง"],
      rows: [
        ["I / You / We / They", "Do / Don't", "Do you know him?"],
        ["He / She / It", "Does / Doesn't", "Does she like tea?"],
        ["ทุกประธาน (อดีต)", "Did / Didn't", "Did they go home?"],
      ],
    },
    questions: [
      {
        prompt: "_____ she like tea?",
        options: ["Do", "Does", "Did", "Is"],
        correct: 1,
        explanation:
          "\u201Cshe\u201D เป็นประธานเอกพจน์บุรุษที่ 3 ต้องใช้ Does นำหน้า และกริยาหลัก like ไม่ต้องเติม s",
      },
      {
        prompt: "They _____ not finish their homework yesterday.",
        options: ["does", "did", "do", "doesn't"],
        correct: 1,
        explanation:
          "\u201Cyesterday\u201D คือสัญญาณอดีต ต้องใช้ Did + not และกริยาหลักเป็นช่องที่ 1 เสมอ",
      },
      {
        prompt: "_____ you go to the party last night?",
        options: ["Do", "Does", "Did", "Have"],
        correct: 2,
        explanation: "\u201Clast night\u201D บอกอดีต ทุกประธานใช้ Did เหมือนกันหมด",
      },
      {
        prompt: "She _____ not eat meat.",
        options: ["do", "does", "did", "is"],
        correct: 1,
        explanation: "ไม่มีคำบอกเวลาอดีต และ She เป็นเอกพจน์บุรุษที่ 3 จึงใช้ Does + not",
      },
      {
        prompt: "_____ they live in Bangkok?",
        options: ["Does", "Did", "Do", "Is"],
        correct: 2,
        explanation: "they เป็นพหูพจน์ ต้องใช้ Do เสมอในประโยคคำถามปัจจุบัน",
      },
      {
        prompt: "People do _____ want flies around their houses.",
        options: ["not", "no", "never", "none"],
        correct: 0,
        explanation: "ทำ do ให้เป็นประโยคปฏิเสธ ต้องตามด้วย not (do not = don't)",
      },
      {
        prompt: "Woman: Can I borrow a pen?\nMan: Sorry! I _____ have one.",
        options: ["can't", "won't", "don't", "didn't"],
        correct: 2,
        explanation: "ประโยคปฏิเสธ present tense กับ I ใช้ don't (do not)",
      },
      {
        prompt: "Man: What do you usually _____ in the evenings?\nWoman: I like to watch Netflix.",
        options: ["do", "doing", "done", "did"],
        correct: 0,
        explanation: "หลัง Do / Does กริยาแท้ต้องเป็นรูปไม่ผัน (do)",
      },
      {
        prompt: "Boy: When _____ George start learning Spanish?\nGirl: About two years ago, I think.",
        options: ["did", "will", "was", "does"],
        correct: 0,
        explanation: "ถามเหตุการณ์ในอดีต ใช้ did นำหน้ากริยาช่อง 1",
      },
      {
        prompt: "Man: _____ you play the violin in school last year?\nWoman: No, I played the piano.",
        options: ["Did", "Are", "Have", "Were"],
        correct: 0,
        explanation: "มี last year บ่งบอกอดีต ใช้ Did นำหน้ากริยาแท้ (play)",
      },
      {
        prompt: "Woman: _____ your brother spend Christmas with you?\nMan: Every year.",
        options: ["Do", "Does", "Have", "Has"],
        correct: 1,
        explanation: "your brother เป็นบุรุษเอกพจน์ ใช้ Does นำหน้ากริยาแท้ใน present simple",
      },
      {
        prompt: "Woman: What kind of music _____ you listening to these days?\nMan: Jazz is probably my favorite right now.",
        options: ["Are", "Do", "Is", "Were"],
        correct: 0,
        explanation: "ใช้ Present Continuous (are + V-ing) เพราะถามสิ่งที่กำลังทำอยู่ช่วงนี้ (these days)",
      },
      {
        prompt: "Woman: Is your sister _____ television?\nMan: No, she is not.",
        options: ["watch", "watches", "to watch", "watching"],
        correct: 3,
        explanation: "Present Continuous ใช้กับการกระทำที่เกิดขึ้นตอนนี้ กริยาเติม -ing เป็น watching",
      },
      {
        prompt: "Boy: Have you seen Maria?\nGirl: Sorry, I don't know where she _____.",
        options: ["is", "was", "been", "being"],
        correct: 0,
        explanation: "ถามถึงตำแหน่งปัจจุบันของ Maria ใช้ present tense: I don't know where she is",
      },
    ],
  },

  agree: {
    id: "agree",
    icon: Scale,
    name: "Subject-Verb Agreement",
    tagline: "ประธานเอกพจน์หรือพหูพจน์ กริยาต้องยอมตามให้ถูกคู่",
    rules: [
      "ประธานเอกพจน์บุรุษที่ 3 (He, She, It) ในประโยคปัจจุบัน กริยาต้องเติม s / es เสมอ เช่น walks, goes",
      "ประธานพหูพจน์ (I, You, We, They, dogs) กริยาไม่เติม s — ยกเว้นประธานเดี่ยว I ที่ใช้กริยาฐานตลอด",
      "คำอย่าง everyone, everybody, each และ no one เป็นเอกพจน์เสมอ แม้ความหมายจะรู้สึกเหมือนหลายคน",
    ],
    examples: [
      { wrong: "He walk to school every day.", right: "He walks to school every day." },
      { wrong: "They goes to the gym on Mondays.", right: "They go to the gym on Mondays." },
      { wrong: "Everyone have arrived already.", right: "Everyone has arrived already." },
    ],
    vault: {
      title: "ตารางประธานคู่รูปกริยา (Present Simple)",
      columns: ["ประธาน", "รูปกริยา", "ตัวอย่าง"],
      rows: [
        ["He / She / It", "เติม s / es", "She plays tennis."],
        ["I / You / We / They", "ไม่เติม s", "They play tennis."],
        ["Everyone / Each / No one", "เอกพจน์ → เติม s", "Everyone likes pizza."],
      ],
    },
    questions: [
      {
        prompt: "She _____ to the radio every morning.",
        options: ["listen", "listens", "listening", "listened"],
        correct: 1,
        explanation:
          "\u201CShe\u201D เป็นเอกพจน์บุรุษที่ 3 และคำว่า every morning บอกปัจจุบัน กริยาต้องเติม s",
      },
      {
        prompt: "My parents _____ coffee every morning.",
        options: ["drinks", "drink", "drinking", "drank"],
        correct: 1,
        explanation: "\u201Cparents\u201D เป็นประธานพหูพจน์ กริยาจึงไม่เติม s",
      },
      {
        prompt: "The dog _____ loudly at night.",
        options: ["bark", "barks", "barking", "barked"],
        correct: 1,
        explanation: "\u201CThe dog\u201D เป็นประธานเอกพจน์บุรุษที่ 3 ต้องเติม s ที่กริยา",
      },
      {
        prompt: "Everyone _____ ready for the exam.",
        options: ["are", "is", "were", "be"],
        correct: 1,
        explanation:
          "\u201CEveryone\u201D ดูเหมือนหลายคนแต่เป็นเอกพจน์ตามหลักไวยากรณ์ จึงใช้ is",
      },
      {
        prompt: "Tom and Jerry _____ in the same house.",
        options: ["lives", "live", "living", "lived"],
        correct: 1,
        explanation:
          "ประธานสองตัวเชื่อมด้วย \u201Cand\u201D กลายเป็นพหูพจน์ กริยาจึงไม่เติม s",
      },
      {
        prompt: "Sometimes she _____ a piece of bread to give to the birds.",
        options: ["take", "takes", "taking", "took"],
        correct: 1,
        explanation: "ประธาน she เป็นเอกพจน์บุรุษที่ 3 กริยาจึงต้องเติม s/es เป็น takes",
      },
      {
        prompt: "Man: Is Anna here today?\nWoman: No, _____ at home on Tuesdays.",
        options: ["she is working", "she would work", "she works", "she work"],
        correct: 2,
        explanation: "บอกกิจวัตรที่เกิดเป็นประจำ (every Tuesday) ใช้ present simple: she works",
      },
      {
        prompt: "Man: Richard _____ the doctor every year.\nWoman: I should do that, too.",
        options: ["saw", "sees", "seen", "seeing"],
        correct: 1,
        explanation: "every year = ทุกปี (present simple) ประธาน Richard เป็นเอกพจน์ กริยา see จึงเติม s เป็น sees",
      },
    ],
  },

  "wh-q": {
    id: "wh-q",
    icon: HelpCircle,
    name: "Wh-questions",
    tagline: "ถามให้ตรงเรื่อง — Where/When/Who/Whose/How often",
    rules: [
      "คำถาม Wh ต้องเลือกให้ตรงกับคำตอบ — Where ถามสถานที่, When ถามเวลา, Who ถามคน, Whose ถามเจ้าของ และ How often ถามความถี่",
      "How long ถามระยะเวลา, How far ถามระยะทาง — สังเกตหน่วยในคำตอบจะช่วยเลือกได้",
    ],
    examples: [
      { wrong: "How long do you go to the gym? — Three times a week.", right: "How often do you go to the gym? — Three times a week." },
      { wrong: "Where you went last night?", right: "Where did you go last night?" },
      { wrong: "Who book is this?", right: "Whose book is this?" },
    ],
    vault: {
      title: "ตาราง Wh-words",
      columns: ["คำ", "ใช้เมื่อไหร่", "ตัวอย่าง"],
      rows: [
        ["Where / When", "ถามสถานที่ / ถามเวลา", "Where did you go? — Japan."],
        ["Who / Whose", "ถามคน / ถามเจ้าของ", "Who is that woman? — My teacher."],
        ["How often", "ถามความถี่", "How often? — Three times a week."],
        ["How long / How far", "ถามระยะเวลา / ระยะทาง", "How far is it? — 5 km."],
      ],
    },
    questions: [
      {
        prompt: "_____ did you go on holiday? — I went to Japan.",
        options: ["What", "Where", "When", "Who"],
        correct: 1,
        explanation: "คำตอบบอกสถานที่ (Japan) คำถามต้องถามสถานที่ จึงใช้ Where",
      },
      {
        prompt: "_____ do you go to the gym? — Three times a week.",
        options: ["How long", "How far", "How often", "How"],
        correct: 2,
        explanation: "Three times a week คือความถี่ ต้องถามด้วย How often",
      },
      {
        prompt: "_____ is that woman? — She's my teacher.",
        options: ["Whose", "What", "Who", "Where"],
        correct: 2,
        explanation: "คำตอบเป็นบุคคล ต้องถามคนด้วย Who",
      },
      {
        prompt: "_____ bag is this? — It's mine.",
        options: ["Who", "Whose", "Which", "Where"],
        correct: 1,
        explanation: "ถามเจ้าของใช้ Whose ตามด้วยของ",
      },
      {
        prompt: "_____ is your birthday? — On 12 March.",
        options: ["When", "Where", "How", "Who"],
        correct: 0,
        explanation: "คำตอบเป็นวันที่ ใช้ When",
      },
      {
        prompt: "Woman: _____ do you do?\nMan: I'm a chef in a French restaurant.",
        options: ["How", "Where", "What", "Whose"],
        correct: 2,
        explanation: "ถามอาชีพนิยมใช้ What do you do?",
      },
      {
        prompt: "Man: What do you _____?\nWoman: I'm a teacher.",
        options: ["go", "try", "make", "do"],
        correct: 3,
        explanation: "What do you do? = คุณทำงานอะไร? เป็นประโยคถามอาชีพมาตรฐาน",
      },
      {
        prompt: "Man: _____ wrong?\nWoman: I don't feel very well.",
        options: ["How's", "What's", "Are you", "What's the"],
        correct: 1,
        explanation: "What's wrong? เป็นการถามว่าเกิดอะไรขึ้น / เป็นอะไรหรือเปล่า",
      },
      {
        prompt: "Woman: _____ did you get home last night?\nMan: I got a taxi.",
        options: ["What", "When", "Where", "How"],
        correct: 3,
        explanation: "ถามวิธีการ (How = อย่างไร) เพราะกลับบ้านโดยแท็กซี่",
      },
      {
        prompt: "Woman: _____ do you visit your hometown?\nMan: Once a year.",
        options: ["How long", "How far", "How often", "How"],
        correct: 2,
        explanation: "Once a year บอกความถี่ ใช้ How often = บ่อยแค่ไหน",
      },
      {
        prompt: "Woman: _____ coat is this?\nMan: I don't know. It's not mine.",
        options: ["Who", "Who's", "Whom", "Whose"],
        correct: 3,
        explanation: "Whose ใช้ถามความเป็นเจ้าของ เช่น Whose coat is this? = เสื้อโค้ทนี้ของใคร?",
      },
      {
        prompt: "Woman: There is a green scarf on the chair. _____ is it?\nMan: It isn't mine. It might be Ben's.",
        options: ["Who", "Whom", "Which", "Whose"],
        correct: 3,
        explanation: "Whose is it? = ของใคร? ใช้ถามเจ้าของสิ่งของที่ไม่ทราบเจ้าของ",
      },
      {
        prompt: "Man: Good morning. I'd like to get a ticket to New York.\nWoman: Of course. _____ would you like to fly?",
        options: ["Why", "When", "Who", "Where"],
        correct: 1,
        explanation: "ถามเวลาที่ออกเดินทาง ใช้ When (เมื่อไหร่)",
      },
      {
        prompt: "Woman: Hello, Simon. _____ are you?\nMan: I'm fine, thank you.",
        options: ["Why", "Who", "How", "Where"],
        correct: 2,
        explanation: "ถามสารทุกข์ใช้ How are you? เป็นประโยคถามมาตรฐาน",
      },
    ],
  },

  qtag: {
    id: "qtag",
    icon: HelpCircle,
    name: "Question tags",
    tagline: "ต่อประโยคให้ตรง tag — บอกเล่า↔ปฏิเสธ",
    rules: [
      "Question tags ตรงข้ามกับประโยคหลักเสมอ — ประโยคบอกเล่าใช้ tag ปฏิเสธ ส่วนประโยคปฏิเสธใช้ tag บอกเล่า",
      "ต้องใช้กริยาช่วยตัวเดียวกับประโยคหลัก (is/isn't, have/ haven't, did/didn't)",
      "ประธานใน tag ต้องตรงกับประโยคหลัก — They → they, Tom → he",
    ],
    examples: [
      { wrong: "They didn't go to school yesterday, didn't they?", right: "They didn't go to school yesterday, did they?" },
      { wrong: "She is a teacher, is she?", right: "She is a teacher, isn't she?" },
      { wrong: "You don't like milk, isn't it?", right: "You don't like milk, do you?" },
    ],
    vault: {
      title: "ตาราง Question tags",
      columns: ["ประโยคหลัก", "ใช้ tag แบบ", "ตัวอย่าง"],
      rows: [
        ["บอกเล่า → tag ปฏิเสธ", "กริยาช่วย + n't", "Tom likes football, doesn't he?"],
        ["ปฏิเสธ → tag บอกเล่า", "กริยาช่วยตัวเดิม", "She isn't your sister, is she?"],
        ["I am → aren't I", "สำเรก I ใช้ aren't", "I'm right, aren't I?"],
      ],
    },
    questions: [
      {
        prompt: "She isn't your sister, _____?",
        options: ["is she", "isn't she", "does she", "was she"],
        correct: 0,
        explanation: "ประโยคหลักปฏิเสธ (isn't) tag ต้องเป็นบอกเล่า และใช้ is ตัวเดิม",
      },
      {
        prompt: "Tom likes football, _____?",
        options: ["does he", "doesn't he", "isn't he", "don't he"],
        correct: 1,
        explanation: "ประโยคหลักบอกเล่า tag ต้องเป็นปฏิเสธ likes เป็นเอกพจน์บุรุษที่ 3 ใช้ doesn't",
      },
      {
        prompt: "They didn't go to school yesterday, _____?",
        options: ["did they", "didn't they", "do they", "were they"],
        correct: 0,
        explanation: "ประโยคหลักปฏิเสธด้วย didn't tag ต้องเป็นบอกเล่าและใช้ did ตัวเดิม",
      },
      {
        prompt: "You are Thai, _____?",
        options: ["are you", "aren't you", "isn't it", "do you"],
        correct: 1,
        explanation: "ประโยคหลักบอกเล่า tag ต้องเป็นปฏิเสธ จึงใช้ aren't you",
      },
      {
        prompt: "Let's go, _____?",
        options: ["shall we", "will we", "do we", "aren't we"],
        correct: 0,
        explanation: "Let's... เป็นประโยคเชิญชวน tag คงที่คือ shall we",
      },
      {
        prompt: "Woman: You play the piano, _____ you?",
        options: ["do", "don't", "are", "aren't"],
        correct: 1,
        explanation: "ประโยคหลักบอกเล่า tag ต้องเป็นปฏิเสธ ใช้ don't you",
      },
      {
        prompt: "Girl: I thought it was a bit boring.\nBoy: Me too. The other team didn't get the ball very much, _____?",
        options: ["are they", "didn't they", "do they", "did they"],
        correct: 3,
        explanation: "ประโยคหลักปฏิเสธ (didn't) tag ต้องเป็นบอกเล่า คือ did they",
      },
    ],
  },

  polite: {
    id: "polite",
    icon: HelpCircle,
    name: "Polite requests",
    tagline: "Could I..? / Would you..? — สุภาพกว่า Can/Will",
    rules: [
      "ขออนุญาตอย่างสุภาพใช้ \u201CCould I...\u201D ซึ่งสุภาพกว่า Can I",
      "เสนอหรือขอร้องอย่างสุภาพใช้ \u201CWould you like me to...\u201D ตามด้วยกริยาช่อง 1",
      "ในงานเป็นทางการอาจใช้ \u201CWould you mind + V-ing\u201D เพื่อขอร้องสุภาพที่สุด",
    ],
    examples: [
      { wrong: "Can I speak to Mr. Brown, please?", right: "Could I speak to Mr. Brown, please?" },
      { wrong: "Will you help me?", right: "Would you mind helping me?" },
      { wrong: "Do you want another coffee?", right: "Would you like another coffee?" },
    ],
    vault: {
      title: "ตารางคำขอร้องสุภาพ",
      columns: ["รูปแบบ", "ใช้เมื่อไหร่", "ตัวอย่าง"],
      rows: [
        ["Could I...?", "ขออนุญาต", "Could I speak to Mr. Brown?"],
        ["Would you like me to...?", "เสนอช่วย", "Would you like me to play another song?"],
        ["Would you mind + V-ing?", "ขอร้องสุภาพมาก", "Would you mind opening the window?"],
        ["Would you like (something)?", "เสนอสิ่งของ", "Would you like another coffee?"],
      ],
    },
    questions: [
      {
        prompt: "_____ I speak to Mr. Brown, please?",
        options: ["Could", "Will", "Am", "Do"],
        correct: 0,
        explanation: "ขออนุญาตคุยกับคนอื่นอย่างสุภาพใช้ Could I",
      },
      {
        prompt: "_____ you like me to play another song?",
        options: ["Would", "Do", "Could", "Are"],
        correct: 0,
        explanation: "เสนอจะทำอะไรให้อีกฝ่ายอย่างสุภาพใช้ Would you like me to",
      },
      {
        prompt: "_____ you mind closing the door?",
        options: ["Would", "Will", "Do", "Could"],
        correct: 0,
        explanation: "Would you mind + V-ing ใช้ขอร้องสุภาพมากที่สุด",
      },
      {
        prompt: "_____ you like another coffee?",
        options: ["Do", "Would", "Are", "Will"],
        correct: 1,
        explanation: "เสนอสิ่งของอย่างสุภาพใช้ Would you like + noun",
      },
      {
        prompt: "Excuse me, ___ I sit here?",
        options: ["could", "would", "do", "shall"],
        correct: 0,
        explanation: "ขอนั่งข้าง ๆ คนอื่นอย่างสุภาพใช้ Could I",
      },
      {
        prompt: "Woman: Please _____ talk on your phone in this area, sir.\nMan: I'm sorry. I will go outside.",
        options: ["no", "not", "isn't", "don't"],
        correct: 3,
        explanation: "การขอร้องห้ามไม่ให้ทำสิ่งใดใช้ please + don't + กริยาช่อง 1",
      },
    ],
  },

  past: {
    id: "past",
    icon: Clock,
    name: "Past Tense",
    tagline: "เปลี่ยนกริยาให้ถูกช่อง เมื่อเรื่องราวมันผ่านไปแล้ว",
    rules: [
      "กริยาปกติ (Regular Verb) เติม -ed ท้ายคำ เช่น play → played, walk → walked",
      "กริยาไม่ปกติ (Irregular Verb) เปลี่ยนรูปไม่แน่นอน ต้องจำเป็นคำ ๆ ไป เช่น go → went",
      "ประโยคปฏิเสธและคำถามในอดีต ใช้ did/didn't ช่วย แล้วกริยาหลักกลับเป็นช่องที่ 1 เสมอ",
    ],
    examples: [
      { wrong: "I goed to school.", right: "I went to school." },
      { wrong: "She didn't went.", right: "She didn't go." },
      { wrong: "Did you saw him?", right: "Did you see him?" },
    ],
    vault: {
      title: "ตารางกริยา 3 ช่องที่ออกสอบบ่อย",
      columns: ["ช่อง 1 (Base)", "ช่อง 2 (Past)", "ช่อง 3 (Past Participle)"],
      rows: [
        ["go", "went", "gone"],
        ["eat", "ate", "eaten"],
        ["see", "saw", "seen"],
        ["write", "wrote", "written"],
        ["have", "had", "had"],
        ["do", "did", "done"],
        ["take", "took", "taken"],
        ["come", "came", "come"],
        ["give", "gave", "given"],
        ["make", "made", "made"],
        ["forget", "forgot", "forgotten"],
      ],
    },
    questions: [
      {
        prompt: "Yesterday, I _____ to the market.",
        options: ["go", "goes", "went", "going"],
        correct: 2,
        explanation: "\u201Cyesterday\u201D คือสัญญาณอดีต go เป็นกริยาไม่ปกติ เปลี่ยนเป็น went",
      },
      {
        prompt: "She _____ a letter last week.",
        options: ["write", "writes", "wrote", "written"],
        correct: 2,
        explanation: "\u201Clast week\u201D บอกอดีต write ช่อง 2 คือ wrote",
      },
      {
        prompt: "They _____ not come to school yesterday because they were sick.",
        options: ["does", "did", "do", "had"],
        correct: 1,
        explanation: "ใช้ did not + กริยาช่อง 1 (come) เมื่อปฏิเสธประโยคอดีต",
      },
      {
        prompt: "Last year, we _____ to Chiang Mai for vacation.",
        options: ["go", "gone", "goes", "went"],
        correct: 3,
        explanation: "\u201Clast year\u201D บอกอดีต go เปลี่ยนเป็น went",
      },
      {
        prompt: "He _____ his key when he left home.",
        options: ["forget", "forgot", "forgets", "forgotten"],
        correct: 1,
        explanation: "ทั้งประโยคอยู่ในอดีต forget เปลี่ยนเป็นช่อง 2 คือ forgot",
      },
      {
        prompt: "Woman: Sorry I didn't make it to the party.\nMan: What happened?\nWoman: Oh, I _____ really ill so I couldn't go.",
        options: ["feel", "felt", "feels", "feeling"],
        correct: 1,
        explanation: "ป่วยเมื่อคืนก่อนหน้า เป็นเรื่องในอดีต ใช้ felt (ช่อง 2 ของ feel)",
      },
      {
        prompt: "Woman: Where did you _____ last night?\nMan: A new pizzeria in town.",
        options: ["go", "been", "went", "going"],
        correct: 0,
        explanation: "คำถามอดีตใช้ did นำหน้า กริยาหลักต้องกลับเป็นช่องที่ 1 (go)",
      },
      {
        prompt: "Man: Did you go out last night?\nWoman: No, I _____ too tired.",
        options: ["am", "were", "was", "did"],
        correct: 2,
        explanation: "ถามด้วย Did (อดีต) ตอบต้องเป็นอดีตเช่นกัน ประธาน I ใช้ was (กริยา to be ช่อง 2)",
      },
      {
        prompt: "Man: It's hot in here. We need some fresh air.\nWoman: But I _____ the window five minutes ago.",
        options: ["opened", "opening", "had opened", "was opening"],
        correct: 0,
        explanation: "มี ago บ่งบอกเหตุการณ์ในอดีต ใช้กริยาช่อง 2 (opened)",
      },
      {
        prompt: "Man: I _____ to Vietnam last year.\nWoman: Nice! You always go on great trips.",
        options: ["go", "I'll go", "went", "I've been"],
        correct: 2,
        explanation: "มี last year บ่งบอกเหตุการณ์ในอดีต ใช้กริยาช่อง 2: went",
      },
    ],
  },

  have: {
    id: "have",
    icon: Package,
    name: "Have / Has / Had",
    tagline: "ตัวช่วยสร้างประโยค Perfect ที่คนสับสนกันมากที่สุด",
    rules: [
      "\u201CHave\u201D คู่กับ I, You, We, They",
      "\u201CHas\u201D คู่กับ He, She, It (เอกพจน์บุรุษที่ 3) เท่านั้น",
      "\u201CHad\u201D ใช้กับทุกประธานเมื่อเหตุการณ์เกิดก่อนอีกเหตุการณ์ในอดีต — กริยาหลักตามมาต้องเป็นช่องที่ 3",
    ],
    examples: [
      { wrong: "She have a car.", right: "She has a car." },
      { wrong: "I have went there.", right: "I have gone there." },
      { wrong: "By 6 PM, he has already left.", right: "By 6 PM, he had already left." },
    ],
    vault: {
      title: "ตารางประธานคู่ Have-support",
      columns: ["ประธาน", "ใช้กับ", "ตัวอย่าง"],
      rows: [
        ["I / You / We / They", "Have", "I have two dogs."],
        ["He / She / It", "Has", "She has a headache."],
        ["ทุกประธาน (Past Perfect)", "Had", "They had left before I arrived."],
      ],
    },
    questions: [
      {
        prompt: "I _____ two brothers.",
        options: ["has", "had", "have", "having"],
        correct: 2,
        explanation: "ประธาน I คู่กับ Have เท่านั้น ไม่มีคำบอกเวลาอดีต",
      },
      {
        prompt: "She _____ a headache right now.",
        options: ["have", "had", "has", "having"],
        correct: 2,
        explanation: "She เป็นเอกพจน์บุรุษที่ 3 และเป็นปัจจุบัน จึงใช้ Has",
      },
      {
        prompt: "By the time we arrived, the movie _____ already started.",
        options: ["has", "have", "had", "having"],
        correct: 2,
        explanation: "หนังเริ่มก่อนเราไปถึงในอดีต ใช้ Had + กริยาช่อง 3 (Past Perfect)",
      },
      {
        prompt: "They _____ finished the project by last Friday.",
        options: ["has", "have", "had", "having"],
        correct: 2,
        explanation: "\u201Cby last Friday\u201D คือจุดอ้างอิงในอดีต งานที่เสร็จก่อนหน้าใช้ Had + V3",
      },
      {
        prompt: "He _____ never been to Japan.",
        options: ["have", "has", "had", "having"],
        correct: 1,
        explanation: "He เป็นเอกพจน์บุรุษที่ 3 ใน Present Perfect ต้องใช้ has + V3",
      },
      {
        prompt: "Woman: How many children _____ you got?\nMan: Three. Two girls and a boy.",
        options: ["do", "did", "have", "are"],
        correct: 2,
        explanation: "โครงสร้าง Have ... got แปลว่า “มี” — กับ I ใช้ have",
      },
      {
        prompt: "They _____ two children, Sally and Billy.",
        options: ["has", "have", "had", "having"],
        correct: 1,
        explanation: "They เป็นประธานพหูพจน์ present simple ต้องใช้ have",
      },
    ],
  },

  "present-perfect": {
    id: "present-perfect",
    icon: Clock,
    name: "Present Perfect",
    tagline: "Have/Has + V.3 — เรื่องในอดีตที่ยังส่งผลถึงตอนนี้",
    rules: [
      "ใช้ Have/Has + กริยาช่องที่ 3 (Past Participle)",
      "มักใช้กับคำบอกเวลาที่ยังไม่จบ เช่น just, already, yet, ever, never, since, for, recently",
      "ใช้เล่าเหตุการณ์ในอดีตที่ไม่ระบุเวลาแน่ชัด หรือที่ยังคงมีผลต่อปัจจุบัน",
    ],
    examples: [
      { wrong: "I have went to Japan.", right: "I have gone to Japan." },
      { wrong: "She has eat lunch already.", right: "She has eaten lunch already." },
      { wrong: "I have seen him yesterday.", right: "I saw him yesterday." },
    ],
    vault: {
      title: "ตารางสัญญาณ Present Perfect",
      columns: ["สัญญาณ", "ตัวอย่างประโยค"],
      rows: [
        ["just", "I have just finished my homework."],
        ["already", "She has already left."],
        ["yet", "Have you eaten yet?"],
        ["ever / never", "I have never been to Korea."],
        ["for / since", "I have lived here for 5 years."],
        ["recently / lately", "We have met recently."],
      ],
    },
    questions: [
      {
        prompt: "I _____ never _____ to Japan.",
        options: ["have / been", "has / been", "had / been", "have / be"],
        correct: 0,
        explanation: "ประธาน I ใช้ have + กริยาช่อง 3 (been) — never บ่งบอก Present Perfect",
      },
      {
        prompt: "She _____ already _____ lunch.",
        options: ["has / eat", "has / eaten", "have / eaten", "had / eat"],
        correct: 1,
        explanation: "She ใช้ has + กริยาช่อง 3 (eaten)",
      },
      {
        prompt: "_____ you ever _____ sushi?",
        options: ["Have / try", "Has / tried", "Have / tried", "Did / try"],
        correct: 2,
        explanation: "ever ใช้ใน Present Perfect — Have + กริยาช่อง 3 (tried)",
      },
      {
        prompt: "We _____ in Bangkok _____ 2010.",
        options: ["live / since", "lived / since", "have lived / since", "have live / for"],
        correct: 2,
        explanation: "since ใช้กับจุดเริ่มต้นของเวลา ต้องใช้ Present Perfect",
      },
      {
        prompt: "I _____ my keys. I can't get in.",
        options: ["have lost", "lost", "am losing", "had lost"],
        correct: 0,
        explanation: "ผลยังมีอยู่ตอนนี้ (can't get in) ใช้ Present Perfect",
      },
      {
        prompt: "Man: The music was fantastic, wasn't it?\nWoman: Yes, it was the best concert I've _____ been to.",
        options: ["never", "ever", "just", "already"],
        correct: 1,
        explanation: "บอกประสบการณ์ที่สุดที่ 'เคย' ผ่านมา ใช้ ever คู่กับ present perfect",
      },
      {
        prompt: "Man: Has Julia _____ you her new email address yet?\nWoman: Yes. I'll send it to you.",
        options: ["give", "gave", "given", "giving"],
        correct: 2,
        explanation: "ประโยคเป็น present perfect (Has + ประธาน + กริยาช่อง 3) ช่อง 3 ของ give คือ given",
      },
      {
        prompt: "Woman: Where do you live?\nMan: In Boston. I _____ there for six years now.",
        options: ["live", "lived", "have lived", "was living"],
        correct: 2,
        explanation: "for six years = ระยะเวลาต่อเนื่องจนถึงปัจจุบัน ใช้ present perfect: have lived",
      },
    ],
  },

  prep: {
    id: "prep",
    icon: MapPin,
    name: "Prepositions",
    tagline: "in / on / at ตัวเล็กแต่พลาดง่ายที่สุดในข้อสอบ",
    rules: [
      "\u201Cin\u201D ใช้กับช่วงเวลายาว เช่น เดือน ปี ฤดูกาล และสถานที่กว้าง เช่น เมือง ประเทศ",
      "\u201Con\u201D ใช้กับวันและวันที่เฉพาะ และพื้นผิวที่วางของอยู่",
      "\u201Cat\u201D ใช้กับเวลาที่ชัดเจนเป็นนาที/ชั่วโมง และสถานที่เจาะจงเล็ก ๆ",
    ],
    examples: [
      { wrong: "I will meet you in Monday.", right: "I will meet you on Monday." },
      { wrong: "The meeting is on 6 PM.", right: "The meeting is at 6 PM." },
      { wrong: "She was born on 1995.", right: "She was born in 1995." },
    ],
    vault: {
      title: "ตารางอ้างอิง in / on / at",
      columns: ["คำ", "ใช้กับ", "ตัวอย่าง"],
      rows: [
        ["in", "เดือน / ปี / ฤดูกาล / เมือง-ประเทศ", "in July, in 2020, in Bangkok"],
        ["on", "วัน / วันที่ / พื้นผิว", "on Monday, on the table"],
        ["at", "เวลาที่ชัดเจน / สถานที่เจาะจง", "at 6 PM, at the station"],
      ],
    },
    questions: [
      {
        prompt: "I was born _____ 1995.",
        options: ["on", "at", "in", "by"],
        correct: 2,
        explanation: "ปี ค.ศ. เป็นช่วงเวลายาว ต้องใช้ in",
      },
      {
        prompt: "The exam is _____ Monday morning.",
        options: ["in", "at", "on", "for"],
        correct: 2,
        explanation: "วันในสัปดาห์ต้องใช้ on แม้ตามด้วย morning",
      },
      {
        prompt: "We will meet _____ 5 PM.",
        options: ["in", "on", "at", "since"],
        correct: 2,
        explanation: "เวลาที่ชัดเจนเป็นนาที/ชั่วโมงใช้ at",
      },
      {
        prompt: "She lives _____ Bangkok.",
        options: ["on", "at", "in", "to"],
        correct: 2,
        explanation: "ชื่อเมืองเป็นสถานที่กว้าง ใช้ in",
      },
      {
        prompt: "The book is _____ the table.",
        options: ["in", "at", "on", "under"],
        correct: 2,
        explanation: "ของที่วางอยู่บนพื้นผิวใช้ on",
      },
      {
        prompt: "Man: Excuse me – where's the passport office?\nWoman: It's down the street _____ the right, next to the park.",
        options: ["by", "on", "of", "at"],
        correct: 1,
        explanation: "บุพบทบอกตำแหน่งด้านซ้าย/ด้านขวา ใช้คู่กับ on เสมอ (on the right / on the left)",
      },
      {
        prompt: "John Jones lives _____ the United States with his wife, Mary.",
        options: ["at", "in", "on", "to"],
        correct: 1,
        explanation: "ประเทศ (the United States) เป็นพื้นที่กว้าง ใช้ in",
      },
      {
        prompt: "The family often goes _____ the park.",
        options: ["at", "to", "in", "on"],
        correct: 1,
        explanation: "บอกการเคลื่อนที่ไปยังสถานที่ ใช้ go to + สถานที่",
      },
      {
        prompt: "Mary likes to sit _____ a park bench and watch her family.",
        options: ["at", "in", "on", "to"],
        correct: 2,
        explanation: "นั่งอยู่ “บน” ม้านั่ง ใช้ on (บนพื้นผิว)",
      },
      {
        prompt: "Wife: I can't find my keys anywhere!\nHusband: Oh, look! They're _____ the kitchen floor.",
        options: ["on", "by", "at", "in"],
        correct: 0,
        explanation: "บอกตำแหน่งบนพื้นผิวเรียบ ใช้ on (อยู่บนพื้น)",
      },
      {
        prompt: "Man: Where's Billy?\nWoman: He's _____ his bedroom, I think.",
        options: ["in", "on", "under", "between"],
        correct: 0,
        explanation: "อยู่ “ใน” ห้องหรือสิ่งที่มีขอบเขต ใช้ in",
      },
      {
        prompt: "Woman: Can you tell me where the nearest garage is?\nMan: Turn right _____ the next crossroads. You can't miss it.",
        options: ["on", "at", "in", "across"],
        correct: 1,
        explanation: "at ใช้กับจุดตัด/สถานที่เฉพาะ เช่น at the crossroads = ที่สี่แยก",
      },
    ],
  },
  "sva-neither": {
    id: "sva-neither",
    icon: Scale,
    name: "Neither / Either of",
    tagline: "แม้ตามด้วยพหูพจน์ กริยาก็ยังเอกพจน์",
    rules: [
      "Neither of + คำนามพหูพจน์ = ไม่ทั้งคู่ / Either of = อันใดอันหนึ่งก็ได้ — แม้ตามด้วยคำนามพหูพจน์ กริยาต้องเป็นเอกพจน์เสมอ เพราะประธานจริงคือ neither/either",
    ],
    examples: [
      { wrong: "Neither of the girls are my student.", right: "Neither of the girls is my student." },
    ],
    vault: {
      title: "ตาราง Quantifier + of",
      columns: ["Quantifier", "ความหมาย", "กริยา"],
      rows: [
        ["Neither of + พหูพจน์", "ไม่ทั้งคู่", "เอกพจน์ (is / does / has)"],
        ["Either of + พหูพจน์", "อันใดอันหนึ่งก็ได้", "เอกพจน์ (is / does / has)"],
        ["Both of + พหูพจน์", "ทั้งคู่", "พหูพจน์ (are / do / have)"],
      ],
    },
    questions: [
      {
        prompt: "Man: Are those your students?\nWoman: Neither of the two girls _____ my student.",
        options: ["is", "have been", "are", "were"],
        correct: 0,
        explanation: "Neither of + พหูพจน์ ถือเป็นเอกพจน์ กริยาต้องเป็น is ตามหลัก subject-verb agreement",
      },
      {
        prompt: "Man: Are there computers in both classrooms?\nWoman: I'm sorry, _____ of them have computers.",
        options: ["any", "either", "neither", "both"],
        correct: 2,
        explanation: "neither of + พหูพจน์ = ไม่มีอันไหนเลย (ความหมายปฏิเสธ) ภาษาพูดนิยมใช้กริยาพหูพจน์ตามหลัง เช่น neither of them have",
      },
    ],
  },

  "past-perfect": {
    id: "past-perfect",
    icon: Clock,
    name: "Past Perfect",
    tagline: "had + V.3 — เหตุการณ์ที่เก่ากว่าในอดีต",
    rules: [
      "โครงสร้าง had + V.3 ใช้พูดถึงเหตุการณ์ในอดีตที่เกิดก่อนอีกเหตุการณ์หนึ่งในอดีต (เหตุการณ์ที่เก่ากว่าสุดในสองเหตุการณ์)",
    ],
    examples: [
      { wrong: "When I realized you lost your purse...", right: "When did you realize you'd lost your purse?" },
    ],
    vault: {
      title: "ไทม์ไลน์ Past Perfect",
      columns: ["เหตุการณ์", "รูปกริยา", "ตัวอย่าง"],
      rows: [
        ["เก่ากว่า (เกิดก่อน)", "had + V.3", "you'd lost your purse"],
        ["ใหม่กว่า (เกิดทีหลัง)", "Past Simple", "I realized / I tried to pay"],
      ],
    },
    questions: [
      {
        prompt: "Man: When did you realize _____ your purse?\nWoman: When I tried to pay for my lunch.",
        options: ["you lost", "you lose", "you'd lost", "you have lost"],
        correct: 2,
        explanation: "สูญเสียกระเป๋าก่อนรู้ตัว (เหตุการณ์เก่ากว่า) ใช้ you'd lost = you had lost",
      },
      {
        prompt: "Woman: Why did you miss the bus?\nMan: By the time I got to the stop, the bus _____.",
        options: ["left", "has left", "had left", "leaves"],
        correct: 2,
        explanation: "รถออกก่อนที่จะไปถึงป้าย (สองเหตุการณ์ในอดีต) เหตุการณ์ที่เก่ากว่าใช้ had + V.3",
      },
      {
        prompt: "Man: Did you eat the cake I bought?\nWoman: Sorry, Tom had _____ it before I got home.",
        options: ["eat", "ate", "eaten", "eating"],
        correct: 2,
        explanation: "had + ช่อง 3 ของ eat คือ eaten — เหตุการณ์กินเกิดก่อนเหตุการณ์กลับถึงบ้าน",
      },
    ],
  },

  future: {
    id: "future",
    icon: Sparkles,
    name: "Future (will / going to)",
    tagline: "ตัดสินใจตอนนี้ = will / แผนหรือหลักฐานชัด = going to",
    rules: [
      "will ใช้ตัดสินใจ ณ ตอนพูด หรือคาดการณ์ทั่วไป ส่วน going to ใช้พูดถึงแผนที่ตั้งใจไว้ล่วงหน้า หรือคาดการณ์จากหลักฐานที่เห็นอยู่ตรงหน้า",
    ],
    examples: [
      { wrong: "Look at those clouds! It will rain.", right: "Look at those clouds! It's going to rain." },
    ],
    vault: {
      title: "ตาราง will / going to",
      columns: ["เลือกเมื่อไหร่", "คำสัญญาณ", "ตัวอย่าง"],
      rows: [
        ["will", "ตัดสินใจตอนพูด / I think...", "I think I'll make a cake."],
        ["going to", "แผนล่วงหน้า", "I'm going to visit Chiang Mai next month."],
        ["going to", "หลักฐานเห็นชัดตรงหน้า", "Look at those clouds! It's going to rain."],
      ],
    },
    questions: [
      {
        prompt: "Man: What are you going to do with all of those apples?\nWoman: I think _____ a cake.\nMan: What a great idea!",
        options: ["I make", "I'll make", "I've made", "I was making"],
        correct: 1,
        explanation: "ใช้ I'll make (will) สำหรับการตัดสินใจในอนาคตที่คิดขึ้นทันทีตอนพูด สังเกตคำว่า I think",
      },
      {
        prompt: "Woman: I can't afford to go away on holiday this year.\nMan: What _____ instead?\nWoman: I'm not quite sure yet.",
        options: ["do you do", "will you do", "have you do", "were you doing"],
        correct: 1,
        explanation: "will you do ถามถึงการตัดสินใจสำหรับเหตุการณ์ในอนาคต",
      },
      {
        prompt: "Husband: Has Sam said anything about when I should pick him up from the airport?\nWife: Yes. He said _____ you at the airport at five o'clock.",
        options: ["he met", "he meets", "he's met", "he'd meet"],
        correct: 3,
        explanation: "ใน reported speech ที่กริยานำเป็นอดีต (said) will เปลี่ยนเป็น would → he'd meet",
      },
      {
        prompt: "Girl: What are your plans for the weekend?\nBoy: I _____ to the cinema with Kirsty.",
        options: ["go", "went", "will going", "am going"],
        correct: 3,
        explanation: "บอกแผนที่เตรียมการไว้แล้ว ใช้ present continuous (am + V-ing)",
      },
      {
        prompt: "Boy: Why _____ you going swimming with us tomorrow?\nGirl: I'm just too busy.",
        options: ["haven't", "aren't", "don't", "can't"],
        correct: 1,
        explanation: "คำถามปฏิเสธใน present continuous ใช้ aren't + you + V-ing",
      },
    ],
  },

  "it-there": {
    id: "it-there",
    icon: MapPin,
    name: "it / there",
    tagline: "it = สิ่งเจาะจง / there = มี...อยู่",
    rules: [
      "it ใช้พูดถึงสิ่งที่เจาะจง เช่น เวลา ระยะทาง สภาพอากาศ (It's 5 o'clock. / It's far.) ส่วน there ใช้บอกว่า “มี...อยู่” (there is / there are)",
    ],
    examples: [
      { wrong: "It is a book on the table.", right: "There is a book on the table." },
    ],
    vault: {
      title: "ตาราง it / there",
      columns: ["ใช้", "โครงสร้าง", "ตัวอย่าง"],
      rows: [
        ["it", "ระบุเวลา / ระยะทาง / อากาศ", "How far is it? / It's raining."],
        ["there", "บอกว่ามีสิ่งของ / คนอยู่", "There's a cat in the garden."],
      ],
    },
    questions: [
      {
        prompt: "Woman: How far is _____ to the bus stop?\nMan: Only about a five minute walk.",
        options: ["it", "that", "this", "there"],
        correct: 0,
        explanation: "ใช้ it ในการกล่าวถึงระยะทาง (ระยะทางไปป้ายรถเมล์)",
      },
      {
        prompt: "Woman: How far is _____ to Times Square?\nMan: You only have to walk about 10 blocks, I think.",
        options: ["it", "that", "there", "this"],
        correct: 0,
        explanation: "โครงสร้างมาตรฐาน “How far is it to...?” ใช้ถามระยะทางไปยังสถานที่",
      },
      {
        prompt: "Man: Are _____ any bananas on the table?\nWoman: I'm sorry, I ate the last one.",
        options: ["they", "this", "it", "there"],
        correct: 3,
        explanation: "ถามว่า “มีไหม” ใช้โครงสร้าง Are there... กับพหูพจน์ (เอกพจน์ใช้ Is there...)",
      },
      {
        prompt: "Woman: Is _____ any cake in the fridge?\nMan: Yes. Help yourself.",
        options: ["it", "here", "that", "there"],
        correct: 3,
        explanation: "ถามว่ามีหรือไม่ (คำนามนับไม่ได้) ใช้ Is there ... any ...?",
      },
    ],
  },

  "some-any": {
    id: "some-any",
    icon: Package,
    name: "some / any / none / enough",
    tagline: "เลือก quantifier ให้ตรงชนิดประโยค",
    rules: [
      "some ใช้ในประโยคบอกเล่า any ใช้ในประโยคปฏิเสธและคำถาม none แปลว่าไม่มีเลยสักอย่าง และ enough แปลว่าเพียงพอ",
    ],
    examples: [
      { wrong: "I don't have some money.", right: "I don't have any money." },
    ],
    vault: {
      title: "ตาราง some / any / none / enough",
      columns: ["คำ", "ใช้กับประโยค", "ตัวอย่าง"],
      rows: [
        ["some", "บอกเล่า (หรือคำถามเชิญชวน/เสนอ)", "I have some money."],
        ["any", "ปฏิเสธ / คำถาม", "Do you have any money?"],
        ["none", "ปฏิเสธแบบเบ็ดเสร็จ (ไม่มีเลย)", "None of them work."],
        ["enough", "เพียงพอ", "I have enough money."],
      ],
    },
    questions: [
      {
        prompt: "Teacher: Have you read many novels this year?\nStudent: No, I haven't read _____.",
        options: ["some", "none", "few", "any"],
        correct: 3,
        explanation: "ในประโยคปฏิเสธ (haven't) ใช้ any แทน some เพื่อสื่อว่า “ไม่เลย”",
      },
      {
        prompt: "Server: Would you like _____ dessert?\nCustomer: No, thank you. I'm full.",
        options: ["some", "a", "any", "the"],
        correct: 0,
        explanation: "ใช้ some กับคำถามเพื่อการเสนอสิ่งของอย่างสุภาพ (เช่น อาหาร เครื่องดื่ม)",
      },
      {
        prompt: "Man: Do you want to go running or swimming this weekend?\nWoman: _____ is fine with me.",
        options: ["All", "Both", "Every", "Either"],
        correct: 3,
        explanation: "ให้เลือกระหว่างสองทาง (วิ่ง หรือ ว่ายน้ำ) ตอบได้ด้วย Either = อันไหนก็ได้",
      },
      {
        prompt: "Man: Do you want to come with me to the supermarket?\nWoman: No, thanks. I don't need _____.",
        options: ["it", "something", "one", "anything"],
        correct: 3,
        explanation: "ประโยคปฏิเสธใช้ anything เพื่อบอกว่าไม่ต้องการ “อะไรเลย”",
      },
      {
        prompt: "Woman: Would you like another coffee?\nMan: No thanks, I've had _____.",
        options: ["any", "some", "much", "enough"],
        correct: 3,
        explanation: "พอแล้วไม่ต้องการเพิ่ม ใช้ enough",
      },
      {
        prompt: "Woman: _____ of my friends can speak French very well.\nMan: Neither can mine.",
        options: ["No one", "Nobody", "No", "None"],
        correct: 3,
        explanation: "None of + คำนามพหูพจน์ = ไม่มีสักคน เช่น None of my friends",
      },
      {
        prompt: "Woman: There isn't _____ to make a cake.\nMan: Do you want me to get it now?",
        options: ["enough sugar", "sugar enough", "enough of sugar", "few sugar"],
        correct: 0,
        explanation: "enough วางไว้หน้าคำนาม เช่น enough sugar = น้ำตาลเพียงพอ",
      },
      {
        prompt: "Man: Does it cost _____ to fly from London to Edinburgh?\nWoman: I think it's cheaper if you book on the Internet.",
        options: ["many", "much", "a few", "a lot of"],
        correct: 1,
        explanation: "ราคา/เงิน เป็นคำนามนับไม่ได้ ใช้ much",
      },
    ],
  },

  possessive: {
    id: "possessive",
    icon: Bookmark,
    name: "Possessive + Reflexive",
    tagline: "my / mine / myself ใช้ต่างกันอย่างไร",
    rules: [
      "Possessive (my / your / his / her / our / their) บอกความเป็นเจ้าของ ส่วน Reflexive (myself / yourself / himself...) ใช้ตอนประธานกับกรรมเป็นคนเดียวกัน",
    ],
    examples: [
      { wrong: "I made it my.", right: "I made it myself." },
    ],
    vault: {
      title: "ตาราง Possessive → Reflexive",
      columns: ["Possessive", "Reflexive"],
      rows: [
        ["my", "myself"],
        ["your", "yourself"],
        ["his / her / its", "himself / herself / itself"],
        ["our", "ourselves"],
        ["their", "themselves"],
      ],
    },
    questions: [
      {
        prompt: "Mr. John Jones lives in the United States with _____ wife, Mary.",
        options: ["his", "her", "their", "our"],
        correct: 0,
        explanation: "สรรพนามแสดงความเป็นเจ้าของของ John (ผู้ชาย) คือ his",
      },
      {
        prompt: "Man: Whose is that fantastic car?\nWoman: Actually, it's _____.\nMan: Lucky you.",
        options: ["theirs", "mine", "yours", "hers"],
        correct: 1,
        explanation: "บอก “ของฉัน” แบบโดด ๆ โดยไม่มีคำนามตามหลัง ใช้สรรพนาม mine",
      },
      {
        prompt: "Woman: Do you live with your parents?\nMan: No, I live by _____.",
        options: ["my own", "me", "myself", "mine"],
        correct: 2,
        explanation: "by myself = ด้วยตัวเอง / อยู่คนเดียว",
      },
      {
        prompt: "Man: Is this David's phone?\nWoman: Yes, it is _____ phone.",
        options: ["him", "his", "he", "himself"],
        correct: 1,
        explanation: "David เป็นผู้ชาย ใช้ possessive adjective ว่า his (ของเขา)",
      },
      {
        prompt: "Man: Beautiful curtains!\nWoman: Thanks, I made them _____.",
        options: ["myself", "me", "my me", "my"],
        correct: 0,
        explanation: "ทำด้วยตัวเอง ย้ำว่าเป็นฝีมือตัวเอง ใช้ myself",
      },
      {
        prompt: "Woman: I'm going to the mountains at the weekend, but I haven't got any climbing boots.\nMan: Oh, do you want to borrow _____?",
        options: ["my", "me", "mine", "mines"],
        correct: 2,
        explanation: "ใช้ mine (ของฉัน) แทนคำนาม เพื่อไม่ต้องพูดซ้ำ",
      },
      {
        prompt: "Man: Whose is that money on the table?\nWoman: It's _____. I forgot that I left it there last night.",
        options: ["his", "mine", "ours", "yours"],
        correct: 1,
        explanation: "mine บอกว่าเงินนั้นเป็น “ของฉัน” ยืนยันในประโยคหลังว่าลืมทิ้งไว้เอง",
      },
    ],
  },

  "object-pronoun": {
    id: "object-pronoun",
    icon: Star,
    name: "Object pronoun",
    tagline: "me / him / them วางหลังกริยาและ preposition",
    rules: [
      "Object pronoun (me, you, him, her, it, us, them) ใช้เป็นกรรมของประโยค คือวางหลังกริยา หรือหลัง preposition",
    ],
    examples: [
      { wrong: "Peter gave it to I.", right: "Peter gave it to me." },
    ],
    vault: {
      title: "ตาราง Subject → Object",
      columns: ["Subject", "Object"],
      rows: [
        ["I", "me"],
        ["you", "you"],
        ["he / she / it", "him / her / it"],
        ["we", "us"],
        ["they", "them"],
      ],
    },
    questions: [
      {
        prompt: "Woman: Where did you get that book?\nMan: Peter gave it to _____ yesterday.",
        options: ["me", "my", "mine", "myself"],
        correct: 0,
        explanation: "กรรมรองรับกริยา gave คือ me (ยืมให้ “ฉัน”)",
      },
      {
        prompt: "Woman: Oh dear, I've left my gloves in the car.\nMan: Don't worry, I'll get _____ for you.",
        options: ["it", "them", "some", "ones"],
        correct: 1,
        explanation: "gloves เป็นพหูพจน์ (คู่) ใช้สรรพนามพหูพจน์ them อ้างอิง",
      },
    ],
  },

  "since-for": {
    id: "since-for",
    icon: Clock,
    name: "since / for / ago",
    tagline: "จุดเริ่มต้น vs ระยะเวลา vs นับย้อนหลัง",
    rules: [
      "since + จุดเริ่มต้นของเวลา (since 2020) / for + ระยะเวลา (for six years) / ago + ระยะเวลาก่อนหน้านี้นับจากปัจจุบันย้อนไป (ใช้กับ Past Simple)",
    ],
    examples: [
      { wrong: "I've lived here for 2020.", right: "I've lived here since 2020." },
    ],
    vault: {
      title: "ตาราง since / for / ago",
      columns: ["คำ", "ใช้กับ", "ตัวอย่าง"],
      rows: [
        ["since", "จุดเริ่มต้น", "since 2020, since Monday"],
        ["for", "ระยะเวลา", "for two years, for a while"],
        ["ago", "นับย้อนจากตอนนี้ (Past Simple)", "two years ago"],
      ],
    },
    questions: [
      {
        prompt: "Woman: Look! There's Jack.\nMan: Wow! I haven't seen him _____ years.",
        options: ["in", "from", "since", "during"],
        correct: 0,
        explanation: "in years เป็นสำนวนแปลว่า “เป็นเวลาหลายปี” ใช้เหมือน for years (ไม่ได้เจอกันมาหลายปีแล้ว)",
      },
      {
        prompt: "Man: Do you know Teresa?\nWoman: Yes, I met her a couple of months _____.",
        options: ["ago", "past", "away", "since"],
        correct: 0,
        explanation: "บอกในอดีตว่าเกิดมานานแค่ไหนแล้ว ใช้ ago (ผ่านพ้นมาแล้ว)",
      },
      {
        prompt: "Salesperson: I'm sorry, were you waiting a long time?\nCustomer: No, I've only been here _____ a few minutes.",
        options: ["since", "from", "for", "in"],
        correct: 2,
        explanation: "บอกระยะห้วงเวลาต่อเนื่อง ใช้ for",
      },
    ],
  },

  phrasal: {
    id: "phrasal",
    icon: Zap,
    name: "Phrasal verbs",
    tagline: "กริยา+บุพบท ความหมายเปลี่ยน ต้องจำเป็นคู่",
    rules: [
      "กริยา + บุพบท/adverb ที่รวมกันแล้วความหมายเปลี่ยนไปจากคำเดิม เช่น turn on = เปิด, look for = มองหา, eat out = กินนอกบ้าน ต้องจำเป็นคู่",
    ],
    examples: [
      { wrong: "Please turn in the light.", right: "Please turn on the light." },
    ],
    vault: {
      title: "ตาราง Phrasal verbs ที่ออกสอบบ่อย",
      columns: ["Phrasal verb", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["turn on", "เปิด", "turn on the light"],
        ["blow off", "พัดปลิวหาย", "blew my hat off"],
        ["eat out", "กินข้าวนอกบ้าน", "Let's eat out."],
        ["look for", "มองหา", "look for a job"],
      ],
    },
    questions: [
      {
        prompt: "Woman: Come in – you look a bit cold.\nMan: Thanks – the wind's so strong it nearly blew my hat _____.",
        options: ["out", "off", "on", "down"],
        correct: 1,
        explanation: "blow off = พัดปลิวหาย เช่น blew my hat off = หมวกโดนพัดปลิวไป",
      },
      {
        prompt: "Wife: Do you fancy going to that new restaurant in town?\nHusband: Oh, I'm really tired. Let's eat _____ this evening.",
        options: ["in", "at", "out", "about"],
        correct: 2,
        explanation: "eat out = กินข้าวนอกบ้าน เป็น phrasal verb มาตรฐาน",
      },
      {
        prompt: "Woman: Why did you decide to _____ another job?\nMan: I wasn't happy with the one I had.",
        options: ["look at", "look after", "look for", "look into"],
        correct: 2,
        explanation: "look for = มองหา/ค้นหา เช่น look for a job = หางานใหม่",
      },
      {
        prompt: "Man: It is dark in here.\nWoman: I will turn _____ the light.",
        options: ["on", "out", "over", "off"],
        correct: 0,
        explanation: "turn on = เปิด ใช้กับเปิดไฟ/เครื่องใช้ไฟฟ้า",
      },
      {
        prompt: "Woman: My coworkers are always arguing. Should I say something?\nMan: If I were you, I'd _____ out of it.",
        options: ["put", "stay", "hold", "move"],
        correct: 1,
        explanation: "stay out of it = อยู่นอกเรื่อง/ไม่ยุ่งเกี่ยว",
      },
      {
        prompt: "Man: Are you planning anything for your daughter's first birthday?\nWoman: We don't know yet, but I'm sure we'll _____ with something special.",
        options: ["come up", "catch on", "give up", "end up"],
        correct: 0,
        explanation: "come up with = คิดหา/นึกออกมา เช่น come up with an idea",
      },
      {
        prompt: "Daughter: Mom, do you recycle these bottles?\nMother: Yes, but _____ a minute. We need to wash them first.",
        options: ["come by", "come up", "hang on", "hang in"],
        correct: 2,
        explanation: "hang on = รอสักครู่",
      },
    ],
  },

  relative: {
    id: "relative",
    icon: Link,
    name: "who / which / that / whose",
    tagline: "เลือก relative pronoun ให้ตรงสิ่งที่ขยาย",
    rules: [
      "who ใช้แทนคน / which ใช้แทนสิ่งของ สัตว์ / that ใช้แทนได้ทั้งคนและสิ่งของ (แบบกันเอง) / whose ใช้แสดงความเป็นเจ้าของ",
    ],
    examples: [
      { wrong: "The woman which won the award is here.", right: "The woman who won the award is here." },
    ],
    vault: {
      title: "ตาราง relative pronoun",
      columns: ["Pronoun", "ใช้แทน", "ตัวอย่าง"],
      rows: [
        ["who", "คน", "the man who called"],
        ["which", "สิ่งของ / สัตว์", "the book which I read"],
        ["that", "คนหรือสิ่งของ (กันเอง)", "the car that I bought"],
        ["whose", "ความเป็นเจ้าของ", "the girl whose bag is red"],
      ],
    },
    questions: [
      {
        prompt: "Plastic bags _____ are filled with water hang over the door.",
        options: ["what", "who", "that", "where"],
        correct: 2,
        explanation: "that ใช้แทน plastic bags (สิ่งของ) ซึ่งถูกขยายด้วย relative clause",
      },
      {
        prompt: "Woman: Do you know Tony?\nMan: Is he the one _____ son is a doctor?\nWoman: That's him!",
        options: ["who", "whom", "which", "whose"],
        correct: 3,
        explanation: "บอกความเป็นเจ้าของ (...ลูกชาย “ของเขา” เป็นคุณหมอ) ใช้ whose",
      },
      {
        prompt: "Man: Do you know the woman _____ won the innovation award?",
        options: ["which", "whose", "whom", "who"],
        correct: 3,
        explanation: "who ทำหน้าที่เป็นประธานของอนุประโยค แทน the woman (คน)",
      },
    ],
  },

  conditional: {
    id: "conditional",
    icon: HelpCircle,
    name: "If-clause Type 1 / 2",
    tagline: "ถ้าเป็นไปได้จริง ใช้ will — ถ้าสมมติ ใช้ would",
    rules: [
      "Type 1 (เป็นไปได้จริงในอนาคต): If + Present Simple, ... will + V.1 / Type 2 (สมมติที่ไม่จริงในปัจจุบัน): If + Past Simple, ... would + V.1",
    ],
    examples: [
      { wrong: "If it rain tomorrow, I'll stay home.", right: "If it rains tomorrow, I'll stay home." },
    ],
    vault: {
      title: "ตาราง If-clause",
      columns: ["แบบ", "If-clause", "ประโยคหลัก", "ตัวอย่าง"],
      rows: [
        ["Type 1", "Present Simple", "will + V.1", "If it rains, I'll stay home."],
        ["Type 2", "Past Simple", "would + V.1", "If we had time, we'd go out."],
      ],
    },
    questions: [
      {
        prompt: "_____ this doesn't work, you can try hanging clear plastic bags.",
        options: ["Because", "If", "When", "Although"],
        correct: 1,
        explanation: "If ใช้บอกเงื่อนไขแปลว่า “ถ้า...” (ถ้าสิ่งนี้ไม่ได้ผล คุณก็ลองแบบนี้)",
      },
      {
        prompt: "Man: Will you be at John's party tomorrow?\nWoman: Well, I'll come _____ I finish work in time.",
        options: ["if", "while", "when", "unless"],
        correct: 0,
        explanation: "เป็นประโยคเงื่อนไข จะมาได้ก็ต่อเมื่อเลิกงานทันเวลา = if I finish work in time",
      },
      {
        prompt: "Woman: Why don't we go out for dinner more often?\nMan: Well, if we _____ more time, we'd go out once a week.",
        options: ["had", "have", "will have", "would have"],
        correct: 0,
        explanation: "If-clause Type 2 (สมมติในปัจจุบัน) กริยาใน if-clause ต้องเป็น past simple (had)",
      },
    ],
  },

  passive: {
    id: "passive",
    icon: Package,
    name: "Passive voice",
    tagline: "be + V.3 — เน้นสิ่งที่ถูกกระทำ",
    rules: [
      "โครงสร้าง be + V.3 ใช้เมื่อต้องการเน้นสิ่งที่ถูกกระทำ มากกว่าผู้กระทำ (หรือไม่รู้/ไม่จำเป็นต้องบอกผู้กระทำ)",
    ],
    examples: [
      { wrong: "The letter wrote by her.", right: "The letter was written by her." },
    ],
    vault: {
      title: "ตาราง passive ตาม tense",
      columns: ["Tense", "โครงสร้าง", "ตัวอย่าง"],
      rows: [
        ["Present", "is/are + V.3", "It is made in Japan."],
        ["Past", "was/were + V.3", "She was named Linda."],
        ["Future", "will be + V.3", "It will be sent tomorrow."],
      ],
    },
    questions: [
      {
        prompt: "Man: How many goals _____ scored in the soccer game yesterday?\nWoman: Only one, I think.",
        options: ["are", "were", "have been", "were being"],
        correct: 1,
        explanation: "ถามจำนวนประตูในอดีต (ถูกทำประตู) goals เป็นพหูพจน์ ใช้ were + V.3",
      },
      {
        prompt: "Woman: What's the name of Sam's new baby?\nMan: I think she _____ Linda.",
        options: ["names", "named", "will name", "was named"],
        correct: 3,
        explanation: "passive voice ในอดีต she was named Linda = เธอถูกตั้งชื่อว่าลินดา",
      },
      {
        prompt: "Woman: Good morning. May I help you?\nMan: Yes, I _____ that you sell laptop computers. Where can I find them?",
        options: ["was telling", "been told", "was told", "did tell"],
        correct: 2,
        explanation: "passive ในอดีต I was told = ฉันได้รับแจ้งมาว่า / มีคนบอกฉันว่า",
      },
    ],
  },

  frequency: {
    id: "frequency",
    icon: Clock,
    name: "always / usually / never",
    tagline: "วางหน้ากริยาแท้ แต่หลัง be",
    rules: [
      "Adverb of frequency บอกความถี่ว่าเกิดขึ้นบ่อยแค่ไหน วางไว้หน้ากริยาแท้ แต่วางไว้หลัง be / กริยาช่วย",
    ],
    examples: [
      { wrong: "I ride never the bus.", right: "I never ride the bus." },
    ],
    vault: {
      title: "มาตราความถี่",
      columns: ["100%", "", "", "", "0%"],
      rows: [
        ["always", "usually", "often", "sometimes", "never"],
      ],
    },
    questions: [
      {
        prompt: "Girl: How often do you play football?\nBoy: Actually, I _____ play football.",
        options: ["often", "never", "always", "usually"],
        correct: 1,
        explanation: "Actually = ที่จริงแล้ว มักบ่งความหมายตรงข้าม จึงตอบว่า “ไม่เคย” (never)",
      },
      {
        prompt: "Woman: How often do you ride the bus to work?\nMan: I _____ ride the bus. I walk every day.",
        options: ["often", "never", "usually", "sometimes"],
        correct: 1,
        explanation: "เดินทุกวัน = ไม่เคยนั่งรถเมล์ ใช้ never",
      },
      {
        prompt: "Woman: Do you stay up late on weekdays?\nMan: No, I _____ stay up late because I have to get up early.",
        options: ["never", "always", "often", "usually"],
        correct: 0,
        explanation: "ต้องตื่นเช้า จึง “ไม่เคย” อดหลับดึก ใช้ never",
      },
    ],
  },

  subjunctive: {
    id: "subjunctive",
    icon: Flag,
    name: "suggest that + V.1",
    tagline: "insist/suggest that + ประธาน + V.1 เปล่า",
    rules: [
      "หลังกริยาแสดงความต้องการ/ข้อเสนอแนะที่เข้มข้น เช่น suggest, insist, recommend, demand ตามด้วย that + ประธาน + กริยาช่องที่ 1 เสมอ (ไม่ผันตามประธาน แม้ประธานจะเป็นเอกพจน์) — นี่คือ Subjunctive Mood",
    ],
    examples: [
      { wrong: "My boss insists that I am on time.", right: "My boss insists that I be on time." },
    ],
    vault: {
      title: "ตารางกริยาที่ตามด้วย subjunctive",
      columns: ["กริยา", "ตัวอย่าง"],
      rows: [
        ["suggest", "I suggest that he see a doctor."],
        ["insist", "She insists that I be on time."],
        ["recommend", "They recommend that she take the test."],
        ["demand", "We demand that he apologize."],
      ],
    },
    questions: [
      {
        prompt: "Woman: Do you like your new job?\nMan: Yes, but my employer insists that I _____ on time.",
        options: ["was", "am", "be", "have been"],
        correct: 2,
        explanation: "insist that + subjunctive = กริยาต้องเป็นรูปคงเดิม (base form) เช่น insists that I be on time",
      },
      {
        prompt: "The teacher recommended that he _____ the exam again.",
        options: ["takes", "take", "took", "taking"],
        correct: 1,
        explanation: "recommend that + subjunctive — กริยาเป็นรูปช่อง 1 เปล่า ไม่ผันตามประธาน",
      },
      {
        prompt: "Woman: Tom looks really tired.\nMan: I suggest that he _____ a doctor.",
        options: ["sees", "see", "saw", "to see"],
        correct: 1,
        explanation: "suggest that + ประธาน + กริยาช่อง 1 (see) ตามหลัก subjunctive mood",
      },
    ],
  },

  "fixed-prep": {
    id: "fixed-prep",
    icon: Bookmark,
    name: "Preposition + Verb คงที่",
    tagline: "worried about / look forward to ตายตัว",
    rules: [
      "บางคำกริยาหรือคำคุณศัพท์ต้องตามด้วย preposition ตัวใดตัวหนึ่งตายตัวเสมอ ต้องจำเป็นคู่ เช่น worried about, look forward to, interested in",
    ],
    examples: [
      { wrong: "I'm worried for the exam.", right: "I'm worried about the exam." },
    ],
    vault: {
      title: "ตารางคู่คำตายตัว",
      columns: ["คู่คำ", "ตัวอย่าง"],
      rows: [
        ["worried about", "I'm worried about my exam."],
        ["look forward to", "I look forward to your reply."],
        ["interested in", "She's interested in art."],
        ["afraid of", "He's afraid of dogs."],
      ],
    },
    questions: [
      {
        prompt: "Man: Are you looking forward _____ your holiday next week?\nWoman: Yes, I can't wait.",
        options: ["in", "to", "at", "for"],
        correct: 1,
        explanation: "look forward to = ตั้งตาคอย เป็นกริยาวลีที่ใช้ to ตายตัว",
      },
      {
        prompt: "Man: What do you think of Maria?\nWoman: Well, she struck me _____ very pleasant.",
        options: ["so", "as", "for", "like"],
        correct: 1,
        explanation: "strike someone as = ให้ความประทับใจว่า... หรือรู้สึกว่าเป็นคนลักษณะ...",
      },
      {
        prompt: "Woman: You look a bit stressed. What's the matter?\nMan: I'm worried _____ my job interview next week.",
        options: ["to", "for", "of", "about"],
        correct: 3,
        explanation: "วิตกกังวลใช้คู่กับ worried about + สิ่งนั้น",
      },
      {
        prompt: "Man: Why do you like your job?\nWoman: Mostly _____ my boss. She's great.",
        options: ["with respect to", "in support of", "according to", "because of"],
        correct: 3,
        explanation: "because of + คำนาม ใช้บอกเหตุผล เช่น because of my boss = เพราะเจ้านาย",
      },
    ],
  },

  comparative: {
    id: "comparative",
    icon: Scale,
    name: "ขั้นกว่า (-er / more)",
    tagline: "เปรียบเทียบ 2 สิ่ง คู่กับ than",
    rules: [
      "คำคุณศัพท์สั้น (1 พยางค์ หรือ 2 พยางค์บางคำ) เติม -er ส่วนคำยาวใช้ more นำหน้า ใช้เปรียบเทียบ 2 สิ่ง และต้องคู่กับ than",
    ],
    examples: [
      { wrong: "She is more tall than me.", right: "She is taller than me." },
    ],
    vault: {
      title: "ตารางเลือก -er หรือ more",
      columns: ["ชนิดคำ", "รูปขั้นกว่า", "ตัวอย่าง"],
      rows: [
        ["สั้น (1 พยางค์)", "เติม -er", "tall → taller, cheap → cheaper"],
        ["ยาว (2+ พยางค์)", "more + คำเดิม", "exciting → more exciting"],
        ["ลงท้าย -y", "เปลี่ยน y เป็น -ier", "happy → happier"],
      ],
    },
    questions: [
      {
        prompt: "Girl: Is Sam _____ than you now?\nBoy: Yes. He's grown a lot recently.",
        options: ["taller", "the tallest", "more taller", "tall"],
        correct: 0,
        explanation: "เปรียบเทียบขั้นกว่า คู่กับ than ใช้ taller",
      },
      {
        prompt: "Man: Can I tell you what I bought you for your birthday?\nWoman: No. Don't tell me. It's _____ exciting that way.",
        options: ["more", "most", "the more", "the most"],
        correct: 0,
        explanation: "exciting เป็นคำหลายพยางค์ สร้างขั้นกว่าด้วย more exciting",
      },
    ],
  },

  superlative: {
    id: "superlative",
    icon: Trophy,
    name: "ขั้นสุด (-est / most)",
    tagline: "เทียบ 3 สิ่งขึ้นไป ต้องมี the นำหน้า",
    rules: [
      "คำสั้นเติม -est คำยาวใช้ most นำหน้า และต้องมี the นำหน้าเสมอ ใช้เปรียบเทียบตั้งแต่ 3 สิ่งขึ้นไป (รูปผันพิเศษ เช่น bad → the worst)",
    ],
    examples: [
      { wrong: "It was the bad film I've seen.", right: "It was the worst film I've seen." },
    ],
    vault: {
      title: "ตารางขั้นสุดที่ผันพิเศษ",
      columns: ["เดิม", "ขั้นกว่า", "ขั้นสุด"],
      rows: [
        ["good", "better", "the best"],
        ["bad", "worse", "the worst"],
        ["many / much", "more", "the most"],
      ],
    },
    questions: [
      {
        prompt: "Man: I didn't like the movie very much. Did you?\nWoman: No. It was one of the _____ I've ever seen.",
        options: ["worst", "worse", "bad", "badly"],
        correct: 0,
        explanation: "one of the + ขั้นสุด + นามพหูพจน์ ใช้ worst (ขั้นสุดของ bad)",
      },
      {
        prompt: "Woman: How was the hotel?\nMan: It was _____ hotel I've ever stayed in.",
        options: ["the worst", "worse", "bad", "the worse"],
        correct: 0,
        explanation: "เปรียบเทียบถึงขั้นที่สุด (ที่เคยพักมา) ต้องมี the นำหน้า: the worst",
      },
      {
        prompt: "This is _____ cake I've ever tasted.",
        options: ["the best", "better", "good", "the better"],
        correct: 0,
        explanation: "ขั้นสุดของ good คือ the best และต้องมี the นำหน้า",
      },
    ],
  },

  "much-comp": {
    id: "much-comp",
    icon: Scale,
    name: "much + comparative",
    tagline: "ห้าม very นำหน้าขั้นกว่า — ใช้ much",
    rules: [
      "ใช้ much / a lot / far วางไว้หน้า comparative เพื่อเน้นว่า “มากกว่ากันเยอะ” (ห้ามใช้ very กับ comparative)",
    ],
    examples: [
      { wrong: "This bus is very cheaper.", right: "This bus is much cheaper." },
    ],
    vault: {
      title: "ตารางคำขยายขั้นกว่า",
      columns: ["คำ", "ตัวอย่าง"],
      rows: [
        ["much", "much cheaper"],
        ["a lot", "a lot better"],
        ["far", "far more useful"],
        ["❌ very", "very cheaper (ผิด) → much cheaper"],
      ],
    },
    questions: [
      {
        prompt: "Woman: I always travel by bus.\nMan: Why?\nWoman: Because it's _____ than the train.",
        options: ["much cheaper", "as cheap", "more cheap", "cheap"],
        correct: 0,
        explanation: "ขั้นกว่าของ cheap คือ cheaper และ much เน้นว่ามากกว่าเยอะ",
      },
      {
        prompt: "Man: How is your mother now?\nWoman: She's much _____, thank you.",
        options: ["better", "best", "good", "well"],
        correct: 0,
        explanation: "much + comparative = ...กว่ามาก เช่น much better = ดีขึ้นมาก",
      },
    ],
  },

  "let-v1": {
    id: "let-v1",
    icon: Star,
    name: "let + V.1 (ไม่มี to)",
    tagline: "หลัง let ต้องเป็นกริยาช่อง 1 เปล่า ๆ",
    rules: [
      "หลังกริยา let (และ make, help บางกรณี) ให้ตามด้วยกริยาช่องที่ 1 แบบไม่มี to (bare infinitive) เช่น can't help but be artistic",
    ],
    examples: [
      { wrong: "My mom let me to stay home late.", right: "My mom let me stay home late." },
    ],
    vault: {
      title: "ตารางกริยาที่ตามด้วย V.1 เปล่า",
      columns: ["โครงสร้าง", "ตัวอย่าง"],
      rows: [
        ["let + กรรม + V.1", "My mom let me stay."],
        ["make + กรรม + V.1", "She made me laugh."],
        ["can't help but + V.1", "I can't help but be artistic."],
      ],
    },
    questions: [
      {
        prompt: "Girl: Good news. My mother let me _____ at school until five today.\nBoy: That's good. We can study for our test together.",
        options: ["stay", "stayed", "to stay", "staying"],
        correct: 0,
        explanation: "โครงสร้าง let + ผู้ถูกกระทำ + กริยาช่อง 1 (ไม่ผัน ไม่เติม to) แปลว่าอนุญาตให้ทำ",
      },
      {
        prompt: "Man: Jenny's really good at drawing, isn't she?\nWoman: Well, her mom's an illustrator and her dad's an architect, so I guess she can't help but _____ artistic.",
        options: ["be", "been", "to be", "being"],
        correct: 0,
        explanation: "can't help but ตามด้วยกริยาช่อง 1 (bare infinitive) แปลว่าไม่อาจหลีกเลี่ยงที่จะ...",
      },
    ],
  },

  "to-inf": {
    id: "to-inf",
    icon: PenLine,
    name: "verb + to + V.1",
    tagline: "want / decide / need ต้องมี to คั่น",
    rules: [
      "กริยาบางตัว เช่น want, decide, need, would like, hope ต้องตามด้วย to + กริยาช่องที่ 1 เสมอ (to-infinitive)",
    ],
    examples: [
      { wrong: "I want take a break.", right: "I want to take a break." },
    ],
    vault: {
      title: "ตารางกริยาที่ตามด้วย to + V.1",
      columns: ["กริยา", "ตัวอย่าง"],
      rows: [
        ["want", "I want to eat."],
        ["decide", "She decided to move."],
        ["need", "We need to leave."],
        ["would like", "I'd like to order."],
        ["hope", "I hope to see you."],
      ],
    },
    questions: [
      {
        prompt: "The best way to reduce the fly population is _____ find where their food comes from.",
        options: ["for", "to", "at", "by"],
        correct: 1,
        explanation: "ขยายเป้าหมายว่าเป็น “วิธีที่จะหา...” ใช้ to + กริยาช่อง 1 (to find)",
      },
      {
        prompt: "Woman: Have you finished moving out of your old apartment?\nMan: Yes, the only thing I have left _____ is take my name off the mailbox.",
        options: ["do", "done", "to do", "for doing"],
        correct: 2,
        explanation: "have left + to do = สิ่งที่เหลืออยู่คือต้องทำ ใช้ to do ขยายสิ่งที่ต้องทำ",
      },
    ],
  },

  "prep-ing": {
    id: "prep-ing",
    icon: BookOpen,
    name: "preposition + V-ing",
    tagline: "หลังบุพบท = V-ing เท่านั้น",
    rules: [
      "หลัง preposition ทุกตัวต้องตามด้วยกริยาเติม -ing (gerund) เท่านั้น ห้ามใช้ to + infinitive เช่น interested in learning",
    ],
    examples: [
      { wrong: "I'm interested to learning English.", right: "I'm interested in learning English." },
    ],
    vault: {
      title: "ตาราง preposition + V-ing",
      columns: ["คู่คำ", "ตัวอย่าง"],
      rows: [
        ["in + V-ing", "interested in learning"],
        ["from + V-ing", "comes from trying"],
        ["good at + V-ing", "good at drawing"],
        ["of + V-ing", "tired of waiting"],
      ],
    },
    questions: [
      {
        prompt: "Their food comes from _____ to remove it.",
        options: ["try", "trying", "tried", "tries"],
        correct: 1,
        explanation: "หลังบุพบท from ต้องตามด้วยคำนามหรือกริยาเติม -ing (gerund)",
      },
      {
        prompt: "Man: What exactly do you want?\nWoman: I would like to see you _____ a good job on the project.",
        options: ["to do", "doing", "having done", "do"],
        correct: 3,
        explanation: "see someone do something โครงสร้างนี้ใช้กริยาช่อง 1 (do) หมายถึงเห็นใครทำอะไร",
      },
      {
        prompt: "Mother: Why did you get home so late?\nSon: I stopped _____ to my friend at school.",
        options: ["to be talking", "have a talk", "talking", "to talk"],
        correct: 3,
        explanation: "stop to + กริยา = หยุดชั่วคราวเพื่อไปทำอย่างอื่น คือหยุดเพื่อไปคุยกับเพื่อน",
      },
    ],
  },

  "keep-ing": {
    id: "keep-ing",
    icon: Clock,
    name: "keep / get used to + V-ing",
    tagline: "keep doing — ทำต่อเนื่องซ้ำ ๆ",
    rules: [
      "keep + V-ing = ทำสิ่งนั้นต่อเนื่อง / get used to + V-ing = เริ่มคุ้นเคยกับสิ่งใหม่ (to ในที่นี้เป็น preposition ตามด้วย V-ing เสมอ)",
    ],
    examples: [
      { wrong: "He keeps look at his phone.", right: "He keeps looking at his phone." },
    ],
    vault: {
      title: "ตาราง keep / get used to",
      columns: ["โครงสร้าง", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["keep + V-ing", "ทำต่อเนื่อง/ซ้ำ ๆ", "keep looking"],
        ["be used to + V-ing", "คุ้นเคยอยู่แล้ว", "I'm used to waking up early."],
        ["get used to + V-ing", "เริ่มชินกับ", "I'm getting used to it."],
      ],
    },
    questions: [
      {
        prompt: "Man: Jeff keeps _____ at his watch.\nWoman: I know. He has an important meeting to go to.",
        options: ["look", "to look", "looking", "to looking"],
        correct: 2,
        explanation: "keep + กริยาเติม -ing (keep doing something) แปลว่าทำอะไรซ้ำ ๆ อย่างต่อเนื่อง",
      },
      {
        prompt: "Man: How do you like your new phone?\nWoman: It's confusing. I'm still getting _____ it.",
        options: ["use", "used", "to used", "used to"],
        correct: 3,
        explanation: "get used to + คำนาม/V-ing = คุ้นเคย/เริ่มชินกับ",
      },
    ],
  },

  "and-or-but": {
    id: "and-or-but",
    icon: Scale,
    name: "and / or / but",
    tagline: "และ / หรือ / แต่ — เชื่อมให้ตรงความหมาย",
    rules: [
      "and = และ (เพิ่มข้อมูล) / or = หรือ (ให้เลือก) / but = แต่ (ขัดแย้งกัน) เลือกให้ตรงความสัมพันธ์ของสองประโยค",
    ],
    examples: [
      { wrong: "Tea and coffee?", right: "Tea or coffee?" },
    ],
    vault: {
      title: "ตาราง conjunctions",
      columns: ["คำ", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["and", "และ", "Sally and Billy are children."],
        ["or", "หรือ", "With or without milk?"],
        ["but", "แต่", "I'm tired but happy."],
        ["because", "เพราะว่า", "I stayed because I was tired."],
      ],
    },
    questions: [
      {
        prompt: "Woman: Do you want your coffee with _____ without milk?\nMan: With milk, please.",
        options: ["or", "for", "but", "and"],
        correct: 0,
        explanation: "ให้เลือกสองทาง (ใส่นม หรือ ไม่ใส่) ใช้ or แปลว่า “หรือ”",
      },
      {
        prompt: "Sally _____ Billy are their children.",
        options: ["but", "and", "or", "because"],
        correct: 1,
        explanation: "รวมชื่อสองคน (แซลลี่และบิลลี่) ใช้ and แปลว่า “และ”",
      },
      {
        prompt: "Man: Do you spell your name with _____ without an “e”?\nWoman: It's Anne with an “e”.",
        options: ["or", "for", "but", "and"],
        correct: 0,
        explanation: "ให้เลือกทางใดทางหนึ่ง ใช้ or (หรือ)",
      },
    ],
  },

  "fixed-phrase": {
    id: "fixed-phrase",
    icon: Sparkles,
    name: "Fixed phrases",
    tagline: "วลีสำเร็จรูป จำเป็นก้อน ๆ",
    rules: [
      "วลีสำเร็จรูปที่คนพูดใช้คู่กันเป็นประจำจนกลายเป็นสำนวน ต้องจำเป็นก้อน ๆ เช่น have a great time, such a..., a lot of",
    ],
    examples: [
      { wrong: "We had the great time!", right: "We had a great time!" },
    ],
    vault: {
      title: "ตาราง fixed phrases ที่ออกสอบบ่อย",
      columns: ["วลี", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["have a great time", "มีความสุขสนาน", "We had a great time in Florida."],
        ["such a + adj + noun", "...มาก (เน้นย้ำ)", "It was such an exciting game."],
        ["a lot of + noun", "จำนวนมาก", "a lot of time"],
      ],
    },
    questions: [
      {
        prompt: "The Jones family spends a lot _____ time together on the weekends.",
        options: ["for", "on", "of", "with"],
        correct: 2,
        explanation: "a lot ตามด้วยบุพบท of เป็น a lot of + คำนาม แปลว่าจำนวนมาก",
      },
      {
        prompt: "Man: Did you watch the basketball game last night?\nWoman: Yes! It was _____ an exciting game.",
        options: ["so", "that", "very", "such"],
        correct: 3,
        explanation: "such ใช้นำหน้า a/an + adjective + noun เพื่อเน้นว่าเป็น...มาก (such an exciting game)",
      },
      {
        prompt: "Man: Where did you go on vacation?\nWoman: We went to Florida, and we _____ a great time.",
        options: ["did", "had", "took", "made"],
        correct: 1,
        explanation: "had a great time = ได้รับความสนุกสนาน เป็นวลีสำเร็จรูป",
      },
      {
        prompt: "Woman: I'll be back in the office early on Monday.\nMan: Right. _____ a good weekend, then.",
        options: ["get", "have", "take", "make"],
        correct: 1,
        explanation: "คำอวยพรนิยมใช้ have เช่น Have a good weekend, Have a good day",
      },
      {
        prompt: "Man: She is great! I can't get _____ how focused her students are!\nWoman: Yes! They really like her class!",
        options: ["by", "after", "over", "between"],
        correct: 2,
        explanation: "can't get over = ไม่หยุดรู้สึกประหลาดใจ/ทึ่ง",
      },
      {
        prompt: "Man: I failed the test.\nWoman: Frankly, it's _____ surprise to me.",
        options: ["none", "no", "any", "not"],
        correct: 1,
        explanation: "no surprise = ไม่น่าแปลกใจเลย เป็นวลีสำเร็จรูป it's no surprise",
      },
      {
        prompt: "Man: Can you work late tonight? There are still some emails to be sent out.\nWoman: I'm more than _____ to help, but I have to leave by 6 p.m. at the latest.",
        options: ["will", "will be", "willing", "be willing"],
        correct: 2,
        explanation: "more than willing = ยินดีมาก/เต็มใจอย่างยิ่ง เป็นวลีสำเร็จรูป",
      },
      {
        prompt: "Boy: Do you eat brown bread?\nGirl: Not really. I _____ white better.",
        options: ["like", "want", "wanted", "eat"],
        correct: 0,
        explanation: "บอกสิ่งที่ชอบกว่า ใช้ like ... better หรือ prefer",
      },
      {
        prompt: "Woman: Hello! Can I _____ a message for Jim?\nMan: Hang on! Just let me find a pen.",
        options: ["say", "give", "drop", "leave"],
        correct: 3,
        explanation: "leave a message = ฝากข้อความ เป็น collocation มาตรฐาน",
      },
      {
        prompt: "Man: I don't feel very well.\nWoman: It sounds like you might be _____ a cold.",
        options: ["doing", "having", "feeling", "getting"],
        correct: 3,
        explanation: "get a cold = เป็นหวัด ใช้ getting = กำลังจะเป็น/เริ่มเป็น",
      },
      {
        prompt: "Girl: What did you give your little brother for his birthday?\nBoy: A toy train _____ chocolate.",
        options: ["filled", "done", "made", "covered"],
        correct: 3,
        explanation: "covered in chocolate = ชุบ/คลุมด้วยช็อกโกแลต",
      },
      {
        prompt: "Man: How long have you been in Australia?\nWoman: Two months.\nMan: And do you _____ it in Sydney?",
        options: ["like", "live", "love", "stay"],
        correct: 0,
        explanation: "ถามความชื่นชอบต่อเมือง ใช้ like it in ...",
      },
      {
        prompt: "Man: Do you like Rosie?\nWoman: She's OK but she doesn't say much.\nMan: Yes, she's a bit _____.",
        options: ["shy", "silly", "kind", "calm"],
        correct: 0,
        explanation: "คนที่พูดน้อย/ไม่ค่อยกล้าแสดงออก เข้ากับคำว่า shy",
      },
      {
        prompt: "Man: What did you think of Paul's girlfriend?\nWoman: I thought she was _____ nice, but she talks all the time.",
        options: ["much", "quite", "some", "enough"],
        correct: 1,
        explanation: "quite เป็นคำขยาย แปลว่า “ค่อนข้าง” เช่น quite nice",
      },
      {
        prompt: "Boy: What have you done to your leg?\nGirl: Oh, I fell over yesterday and it _____ hurts now.",
        options: ["so", "very", "quite", "really"],
        correct: 3,
        explanation: "really ขยายกริยา hurts แปลว่าเจ็บ “จริง ๆ” (มาก)",
      },
      {
        prompt: "Girl: Could I _____ your pen for a minute?\nBoy: Yeah, sure!",
        options: ["borrow", "borrowed", "lend", "lent"],
        correct: 0,
        explanation: "ขอยืมใช้ borrow ส่วน lend คือให้ยืม",
      },
    ],
  },

  "verb-prep": {
    id: "verb-prep",
    icon: Bookmark,
    name: "Verb + Preposition",
    tagline: "look for / believe in ตายตัว",
    rules: [
      "กริยาบางคำต้องจับคู่กับ preposition ที่ตายตัวเสมอ เช่น look for, believe in, apologize for ความหมายจะเปลี่ยนไปถ้าใช้ preposition ผิดตัว",
    ],
    examples: [
      { wrong: "I'm looking at my keys (กำลังมอง ไม่ใช่ตามหา).", right: "I'm looking for my keys." },
    ],
    vault: {
      title: "ตารางกริยาคู่บุพบท",
      columns: ["คู่คำ", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["look for", "มองหา", "looking for my keys"],
        ["look at", "มอง", "look at the picture"],
        ["look forward to", "ตั้งตาคอย", "look forward to the holiday"],
        ["worried about", "กังวลเรื่อง", "worried about the exam"],
      ],
    },
    questions: [
      {
        prompt: "Man: Are you looking forward _____ your holiday next week?\nWoman: Yes, I can't wait.",
        options: ["in", "to", "at", "for"],
        correct: 1,
        explanation: "look forward to = ตั้งตาคอย ใช้ to ตายตัว",
      },
      {
        prompt: "Man: What do you think of Maria?\nWoman: Well, she struck me _____ very pleasant.",
        options: ["so", "as", "for", "like"],
        correct: 1,
        explanation: "strike someone as = ให้ความประทับใจว่า...",
      },
      {
        prompt: "Woman: You look a bit stressed. What's the matter?\nMan: I'm worried _____ my job interview next week.",
        options: ["to", "for", "of", "about"],
        correct: 3,
        explanation: "กังวลใช้คู่กับ worried about + สิ่งนั้น",
      },
    ],
  },

  modal: {
    id: "modal",
    icon: Zap,
    name: "can / could / should / must",
    tagline: "กริยาช่วยแสดงความหมาย ควร / ต้อง / น่าจะ",
    rules: [
      "should = ควร (คำแนะนำ) / had better = ควรที่สุด (เข้มกว่า should) / must = ต้อง หรือคาดเดาว่า “แน่ ๆ”",
      "won't ใช้กับสิ่งของที่ “ไม่ยอม” ทำงาน เช่น The car won't start",
      "don't have to = ไม่จำเป็นต้อง (ต่างจาก mustn't = ห้าม) / used to = เคยทำแต่ตอนนี้ไม่ทำแล้ว",
    ],
    examples: [
      { wrong: "My car doesn't starting.", right: "My car won't start." },
      { wrong: "You had better to stay home.", right: "You had better stay home." },
    ],
    vault: {
      title: "ตาราง modal verbs ที่ออกสอบบ่อย",
      columns: ["Modal", "ความหมาย", "ตัวอย่าง"],
      rows: [
        ["should", "ควร", "We should finish our homework first."],
        ["had better", "ควรที่สุด", "You had better stay home."],
        ["must", "ต้อง / น่าจะแน่", "There must be a lot of pepper."],
        ["won't", "ไม่ยอม (สิ่งของ)", "My car won't start."],
        ["don't have to", "ไม่จำเป็นต้อง", "I don't have to get up early."],
        ["used to", "เคย (ตอนนี้เลิกแล้ว)", "I used to take the bus."],
      ],
    },
    questions: [
      {
        prompt: "Boy: Shall we go to the movie tonight?\nGirl: No, we _____ finish our homework first. It has to be in tomorrow.",
        options: ["might", "would", "could", "should"],
        correct: 3,
        explanation: "should = ควรจะ ใช้แนะนำว่าควรทำสิ่งนั้นก่อน",
      },
      {
        prompt: "Man: I've had almost no energy for three days now.\nWoman: Then you _____ stay home from work. You need to rest.",
        options: ["had to", "would best", "had better", "would better"],
        correct: 2,
        explanation: "had better = เป็นการดีที่สุดที่จะ... (คล้าย should แต่เข้มกว่า)",
      },
      {
        prompt: "Man: How's your lunch?\nWoman: There _____ be a lot of pepper in this dish. It is very spicy!",
        options: ["can", "would", "must", "should"],
        correct: 2,
        explanation: "must ใช้คาดเดาอย่างมั่นใจว่า “ต้อง...แน่ ๆ”",
      },
      {
        prompt: "Man: What's wrong?\nWoman: My car _____.",
        options: ["can't start", "isn't starting", "won't start", "doesn't starting"],
        correct: 2,
        explanation: "won't start แสดงว่าสิ่งของ “ไม่ยอม” ทำงาน คือรถไม่ยอมสตาร์ท",
      },
      {
        prompt: "Woman: Do you know what I really like about the weekends?\nMan: What?\nWoman: _____ have to get up early.",
        options: ["I don't", "I can't", "I mustn't", "I didn't"],
        correct: 0,
        explanation: "“ไม่ต้องตื่นแต่เช้า” ใช้ I don't have to (ไม่จำเป็นต้อง)",
      },
      {
        prompt: "Man: Why don't you take the bus to work?\nWoman: Well, I ___, but it was just so slow.",
        options: ["have to", "need to", "used to", "want to"],
        correct: 2,
        explanation: "used to = เคยทำ (แต่ตอนนี้ไม่ทำแล้ว)",
      },
    ],
  },

  "short-answers": {
    id: "short-answers",
    icon: HelpCircle,
    name: "Short answers (So do I)",
    tagline: "ตอบสั้นให้ตรงกริยาช่วย — So do I / I did",
    rules: [
      "เห็นด้วยกับประโยคบอกเล่า ใช้ So + กริยาช่วยตัวเดิม + ประธาน เช่น So do I, So am I",
      "ตอบคำถาม Who ... ? ด้วยกริยาช่วยสั้น ๆ เช่น I did (= I asked / I ordered)",
    ],
    examples: [
      { wrong: "I always travel by bus. — So I do.", right: "I always travel by bus. — So do I." },
    ],
    vault: {
      title: "ตาราง short answers",
      columns: ["ประโยค", "ตอบสั้น"],
      rows: [
        ["I like coffee.", "So do I"],
        ["She is a teacher.", "So is he"],
        ["Who ordered the drink?", "I did"],
      ],
    },
    questions: [
      {
        prompt: "Woman: I always look forward to the summer holidays.\nMan: So _____ I.",
        options: ["do", "am", "can", "have"],
        correct: 0,
        explanation: "เห็นด้วยกับประโยคบอกเล่า present simple ตอบ So do I",
      },
      {
        prompt: "Woman: I always like to see snow in the winter.\nMan: So _____ I.",
        options: ["do", "am", "can", "have"],
        correct: 0,
        explanation: "เห็นด้วยกับประโยคบอกเล่ากริยา present ใช้ So do I = ฉันก็เหมือนกัน",
      },
      {
        prompt: "Waiter: Who asked for eggs and coffee?\nCustomer: I _____.",
        options: ["did", "got", "took", "made"],
        correct: 0,
        explanation: "ใช้ did แทนกริยา asked ในอดีต แปลว่า “ฉันเป็นคนสั่ง”",
      },
      {
        prompt: "Waiter: Who ordered the soft drink?\nMan: I did.\nWaiter: _____. Enjoy!",
        options: ["Right", "Here you are", "Who is it?", "There"],
        correct: 1,
        explanation: "เวลาเสิร์ฟของให้ลูกค้า พนักงานจะพูดว่า Here you are",
      },
      {
        prompt: "Woman: Did you and Sally go to the meeting last night?\nMan: No, _____ couldn't go. Sally wasn't well.",
        options: ["she", "they", "we", "I"],
        correct: 2,
        explanation: "พูดถึงตัวเองกับ Sally (สองคน) ใช้สรรพนาม we",
      },
    ],
  },
};

export const CATEGORY_ORDER = [
  "do",
  "have",
  "modal",
  "short-answers",
  "agree",
  "sva-neither",
  "wh-q",
  "qtag",
  "polite",
  "past",
  "present-perfect",
  "past-perfect",
  "future",
  "it-there",
  "some-any",
  "possessive",
  "object-pronoun",
  "prep",
  "since-for",
  "phrasal",
  "fixed-prep",
  "comparative",
  "superlative",
  "much-comp",
  "let-v1",
  "to-inf",
  "prep-ing",
  "keep-ing",
  "and-or-but",
  "fixed-phrase",
  "verb-prep",
  "relative",
  "conditional",
  "passive",
  "frequency",
  "subjunctive",
];


/* ------------------------------------------------------------------ */
/* STORAGE LAYER — localStorage + JSON export/import                    */
/* สลับเป็น database จริงภายหลังได้โดยแก้เฉพาะไฟล์นี้                     */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "flowenglish.content.v1";
const PROGRESS_KEY = "flowenglish.progress.v1";

const deep = (v) => JSON.parse(JSON.stringify(v));

// ตัด icon (React component) ออกก่อนแปลงเป็น JSON — เก็บ iconName แทน
const stripIcons = (categories) => {
  const plain = {};
  Object.entries(categories).forEach(([id, cat]) => {
    const { icon, ...rest } = cat;
    plain[id] = { ...rest, iconName: cat.iconName || (BUILTIN_ICONS[cat.icon] ? "BookOpen" : "BookOpen") };
  });
  return plain;
};

const normalizeExample = (e) => ({
  wrong: e && typeof e.wrong === "string" ? e.wrong : "",
  right: e && typeof e.right === "string" ? e.right : "",
});

const normalizeQuestion = (q) => {
  if (!q || typeof q !== "object" || !Array.isArray(q.options)) return null;
  const options = q.options.map((o) => String(o));
  if (options.length < 2) return null;
  let correct = Number(q.correct);
  if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) correct = 0;
  return {
    prompt: typeof q.prompt === "string" ? q.prompt : "",
    options,
    correct,
    explanation: typeof q.explanation === "string" ? q.explanation : "",
    position: Number(q.position) || 1,
  };
};

const normalizeVault = (v, def) => {
  const src = v && typeof v === "object" ? v : {};
  const columns = Array.isArray(src.columns) ? src.columns.map((c) => String(c)) : [...def.columns];
  const rows = Array.isArray(src.rows) ? src.rows : def.rows;
  return {
    title: typeof src.title === "string" ? src.title : def.title,
    columns,
    rows: rows.map((r) => {
      const cells = Array.isArray(r) ? r.map((c) => String(c)) : [];
      while (cells.length < columns.length) cells.push("");
      return cells.slice(0, columns.length);
    }),
  };
};

// โครงสร้างว่างสำหรับหมวดที่ผู้ใช้สร้างเอง (ยังไม่มีเนื้อหา)
const blankCategory = (id, iconName) => ({
  id,
  iconName: typeof iconName === "string" ? iconName : "BookOpen",
  name: id,
  tagline: "",
  rules: [],
  examples: [],
  vault: { title: "", columns: ["หัวข้อ", "รายละเอียด"], rows: [] },
  questions: [],
});

// รวมข้อมูลที่เก็บไว้กับค่าเริ่มต้น ให้ได้โครงสร้างครบและปลอดภัยเสมอ
// - หมวดใน CATEGORY_ORDER → ใช้ DEFAULT_CATEGORIES เป็น fallback
// - หมวดอื่นที่เคยมีในข้อมูล → ถือเป็นหมวดที่ผู้ใช้เพิ่มเอง ใช้ blankCategory เป็น fallback
export const sanitize = (raw) => {
  const out = {};
  const builtInIds = new Set(CATEGORY_ORDER);
  const seen = new Set();
  const visit = (id, def) => {
    if (seen.has(id)) return;
    seen.add(id);
    const src = raw && typeof raw === "object" && raw[id] && typeof raw[id] === "object" ? raw[id] : null;
    out[id] = {
      id,
      icon: def.icon,
      iconName:
        src && typeof src.iconName === "string" && BUILTIN_ICONS[src.iconName]
          ? src.iconName
          : def.iconName,
      name: src && typeof src.name === "string" && src.name ? src.name : def.name,
      tagline: src && typeof src.tagline === "string" ? src.tagline : def.tagline,
      rules: src && Array.isArray(src.rules) ? src.rules.map((r) => String(r)) : deep(def.rules),
      examples: src && Array.isArray(src.examples) ? src.examples.map(normalizeExample) : deep(def.examples),
      vault: normalizeVault(src ? src.vault : null, def.vault),
      questions:
        src && Array.isArray(src.questions)
          ? src.questions.map(normalizeQuestion).filter(Boolean)
          : deep(def.questions),
    };
  };
  CATEGORY_ORDER.forEach((id) => visit(id, DEFAULT_CATEGORIES[id]));
  if (raw && typeof raw === "object") {
    Object.keys(raw).forEach((id) => {
      if (builtInIds.has(id)) return;
      visit(id, blankCategory(id, "BookOpen"));
    });
  }
  return out;
};

// map iconName (string) → React component หลัง sanitize
const resolveIcons = (cats) => {
  const out = {};
  Object.entries(cats).forEach(([id, cat]) => {
    out[id] = { ...cat, icon: BUILTIN_ICONS[cat.iconName] || BUILTIN_ICONS.BookOpen };
  });
  return out;
};

export function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return resolveIcons(sanitize(raw ? JSON.parse(raw) : null));
  } catch (e) {
    console.warn("โหลดเนื้อหาจาก localStorage ไม่สำเร็จ ใช้ค่าเริ่มต้น", e);
    return resolveIcons(sanitize(null));
  }
}

export function saveContent(categories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stripIcons(categories)));
  } catch (e) {
    console.warn("บันทึกเนื้อหาไม่สำเร็จ", e);
  }
}

// ไฟล์ JSON ที่ export คือของส่งต่อให้เว็บจริง — เก็บเฉพาะข้อมูลล้วน ๆ
export function exportContent(categories) {
  return JSON.stringify(
    {
      app: "FlowEnglish",
      version: 1,
      exportedAt: new Date().toISOString(),
      categories: stripIcons(categories),
    },
    null,
    2
  );
}

export function importContent(text) {
  const data = JSON.parse(text);
  return resolveIcons(sanitize(data && data.categories ? data.categories : data));
}

export function resetContent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  return resolveIcons(sanitize(null));
}

/* ------------------------------------------------------------------ */
/* PROGRESS LAYER — จำด่านที่ผ่านแล้วภายในเครื่อง (localStorage)            */
/* ------------------------------------------------------------------ */

const emptyProgress = () => {
  const p = {};
  CATEGORY_ORDER.forEach((id) => {
    p[id] = { completed: false, attempted: 0, correct: 0, xp: 0 };
  });
  return p;
};

// ผสาน progress ที่อ่านได้กับ category ปัจจุบัน — เพิ่ม key ใหม่ให้ครบเสมอ
export function mergeProgress(stored, categories) {
  const base = emptyProgress();
  const ids = new Set([
    ...Object.keys(base),
    ...(stored && typeof stored === "object" ? Object.keys(stored) : []),
    ...Object.keys(categories || {}),
  ]);
  const out = {};
  ids.forEach((id) => {
    const prev = stored && stored[id] && typeof stored[id] === "object" ? stored[id] : {};
    out[id] = {
      completed: !!prev.completed,
      attempted: Number(prev.attempted) || 0,
      correct: Number(prev.correct) || 0,
      xp: Number(prev.xp) || 0,
    };
  });
  return out;
}

export function loadProgress(categories) {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return mergeProgress(raw ? JSON.parse(raw) : null, categories);
  } catch (e) {
    console.warn("โหลด progress ไม่สำเร็จ ใช้ค่าเริ่มต้น", e);
    return mergeProgress(null, categories);
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("บันทึก progress ไม่สำเร็จ", e);
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    /* ignore */
  }
  return emptyProgress();
}

/* ------------------------------------------------------------------ */
/* REMOTE SYNC — Supabase (ฐานข้อมูลกลางให้ทุกคนแก้เนื้อหาร่วมกัน)      */
/* แอปยังทำงานปกติแม้ Supabase ล่ม/ยังไม่ตั้งค่า เพราะมี localStorage รอง */
/* ------------------------------------------------------------------ */

import { getSupabase } from "./supabaseClient.js";

const REMOTE_ID = "main";

// ดึงเนื้อหาล่าสุดจาก Supabase — คืน null ถ้ายังไม่มีข้อมูล/เชื่อมต่อไม่ได้
export async function fetchRemoteContent() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("content_store")
      .select("data")
      .eq("id", REMOTE_ID)
      .maybeSingle();
    if (error) {
      console.warn("ดึงเนื้อหาจาก Supabase ไม่สำเร็จ:", error.message);
      return null;
    }
    return data ? resolveIcons(sanitize(data.data)) : null;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return null;
  }
}

// บันทึกเนื้อหาขึ้น Supabase — คืน true ถ้าสำเร็จ
export async function pushRemoteContent(categories) {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb.from("content_store").upsert({
      id: REMOTE_ID,
      data: stripIcons(categories),
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.warn("บันทึกขึ้น Supabase ไม่สำเร็จ:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* REMOTE SYNC — Units (โครงสร้างหน่วย/เรื่องย่อย)                        */
/* ------------------------------------------------------------------ */

const UNITS_REMOTE_ID = "main";

export async function fetchRemoteUnits() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("units_store")
      .select("data")
      .eq("id", UNITS_REMOTE_ID)
      .maybeSingle();
    if (error) {
      console.warn("ดึงโครงสร้างจาก Supabase ไม่สำเร็จ:", error.message);
      return null;
    }
    return data?.data || null;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return null;
  }
}

export async function pushRemoteUnits(customUnits) {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb.from("units_store").upsert({
      id: UNITS_REMOTE_ID,
      data: customUnits,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.warn("บันทึกโครงสร้างขึ้น Supabase ไม่สำเร็จ:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* REMOTE SYNC — Progress (ผลการเรียน)                                  */
/* ------------------------------------------------------------------ */

const PROGRESS_REMOTE_ID = "main";

export async function fetchRemoteProgress() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("progress_store")
      .select("data")
      .eq("id", PROGRESS_REMOTE_ID)
      .maybeSingle();
    if (error) {
      console.warn("ดึงผลการเรียนจาก Supabase ไม่สำเร็จ:", error.message);
      return null;
    }
    return data?.data || null;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return null;
  }
}

export async function pushRemoteProgress(progress) {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb.from("progress_store").upsert({
      id: PROGRESS_REMOTE_ID,
      data: progress,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      console.warn("บันทึกผลการเรียนขึ้น Supabase ไม่สำเร็จ:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("เชื่อมต่อ Supabase ไม่ได้:", e);
    return false;
  }
}
