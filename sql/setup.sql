-- FlowEnglish: ตารางเก็บเนื้อหาแบบ JSON (1 แถวชื่อ 'main')
-- วิธีใช้: เปิด Supabase Dashboard > SQL Editor แล้ววางสคริปต์นี้ทั้งหมดแล้วกด Run

create table if not exists public.content_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.content_store enable row level security;

-- Prototype: ให้ทุกคนอ่านและแก้ได้ผ่าน anon key
-- ภายหลังถ้าต้องการจำกัดสิทธิ์ ให้ลบ policy นี้แล้วทำระบบ login + policy แยก
drop policy if exists "allow all" on public.content_store;
create policy "allow all" on public.content_store
  for all
  to anon, authenticated
  using (true)
  with check (true);
