import { createClient } from "@supabase/supabase-js";

// ค่า config — override ได้ผ่านไฟล์ .env (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://brdkiyyngcmcfppeppyr.supabase.co";
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

let client = null;

// คืน Supabase client หรือ null ถ้า config ไม่ครบ (แอปยังใช้ localStorage ได้ปกติ)
export function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  if (!client) {
    try {
      client = createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (e) {
      console.warn("สร้าง Supabase client ไม่สำเร็จ", e);
      return null;
    }
  }
  return client;
}
