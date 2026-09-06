# FlowEnglish — Deploy Guide

## Deploy ด้วย Vercel (แนะนำ)

### วิธีที่ 1: Deploy จาก GitHub

1. Push โค้ดขึ้น GitHub repo
2. ไปที่ [vercel.com](https://vercel.com) → Import Project → เลือก repo
3. ตั้งค่า:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Framework Preset**: Vite
4. กด Deploy
5. เสร็จแล้วจะได้ลิงก์ `xxxx.vercel.app` ใช้ได้เลย

### วิธีที่ 2: Deploy ด้วย CLI

```bash
npm i -g vercel
vercel login
vercel        # ทำตาม wizard
vercel --prod # deploy production
```

## Deploy ด้วย Netlify

1. Push โค้ดขึ้น GitHub
2. ไปที่ [netlify.com](https://netlify.com) → Add new site → Import from Git
3. ตั้งค่า:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. กด Deploy
5. ตั้ง custom domain ได้ตามต้องการ

## ตั้งค่า Environment Variables

ถ้าต้องการเชื่อม Supabase จริง ให้ตั้งค่า `.env`:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
VITE_GROQ_API_KEY=gsk_xxxxx          # ใช้สำหรับฟีเจอร์ AI วิเคราะห์เหตุผลในบทเรียน
```

แล้ว push ขึ้น repo หรือตั้งใน Vercel/Netlify dashboard

> ⚠️ หมายเหตุ: `VITE_*` env ถูกฝังใน bundle ฝั่ง client ดังนั้น Groq key จะถูกเปิดเผยต่อผู้ใช้ทุกคน
> — เหมาะสำหรับ prototype เท่านั้น ถ้าต้องการใช้งานจริง ควรย้ายการเรียก Groq ไปไว้ฝั่ง server (proxy API)

## ตั้งค่า Supabase (ถ้ายังไม่ได้ทำ)

1. สร้างบัญชี [supabase.com](https://supabase.com)
2. สร้าง project ใหม่
3. ไปที่ SQL Editor แล้วรันสคริปต์ใน `sql/setup.sql`
4. คัดลอก URL และ anon key มาใส่ใน `.env`

## Restrict Content Editing (Optional)

ถ้าต้องการจำกัดสิทธิ์แก้เนื้อหาให้เฉพาะทีม:
1. รันสคริปต์ `sql/auth-rls.sql` ใน SQL Editor
2. สร้างบัญชี admin ตามคำแนะนำในไฟล์ SQL
3. ดูรายละเอียดเพิ่มเติมใน `sql/auth-rls.sql`
