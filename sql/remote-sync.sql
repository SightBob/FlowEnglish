-- FlowEnglish: ตารางเก็บโครงสร้างหน่วย/เรื่องย่อย + ผลการเรียน
-- วิธีใช้: เปิด Supabase Dashboard > SQL Editor แล้ววางสคริปต์นี้ทั้งหมดแล้วกด Run

-- 1. ตาราง units_store — เก็บโครงสร้างหน่วย/เรื่องย่อยที่ผู้ใช้แก้ไข
create table if not exists public.units_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.units_store enable row level security;

drop policy if exists "units_allow_all" on public.units_store;
create policy "units_allow_all" on public.units_store
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- 2. ตาราง progress_store — เก็บผลการเรียนของผู้ใช้แต่ละคน
create table if not exists public.progress_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.progress_store enable row level security;

drop policy if exists "progress_allow_all" on public.progress_store;
create policy "progress_allow_all" on public.progress_store
  for all
  to anon, authenticated
  using (true)
  with check (true);
