-- ================================================================
-- FlowEnglish: จำกัดสิทธิ์แก้เนื้อหาให้เฉพาะทีม (login + RLS)
-- ================================================================
--
-- ก่อนรันสคริปต์นี้ ต้อง:
--   1. เปิด Supabase Dashboard > Authentication > Providers
--      แล้วเปิด Email/Password provider (ถ้ายังไม่ได้เปิด)
--   2. สร้างตาราง users แล้ว (สคริปต์ด้านล่างจะสร้างให้ถ้ายังไม่มี)
--   3. สร้างบัญชีผู้ดูแล 1 บัญชีก่อน ด้วยระบบ Email ของ Supabase
--      (Dashboard > Authentication > Users > Invite user)
--
-- ขั้นตอน:
--   1. รันสคริปต์นี้ทั้งหมดใน SQL Editor
--   2. สร้างบัญชี admin โดยไปที่ Authentication > Users > Invite user
--      ใส่ email แล้วกด Send invitation
--   3. ไปที่ Database > Tables > app_users แล้วใส่ role = 'admin'
--      ให้กับ user ที่สร้างไว้
--   4. ใน .env ตั้งค่า VITE_SUPABASE_PUBLISHABLE_KEY เป็น anon key
--      (คีย์เดิมที่ใช้อยู่)
--   5. Deploy ใหม่ — หลังจากนี้
--      - อ่านเนื้อหาได้ตามปกติ (ไม่ต้องล็อกอิน)
--      - แก้เนื้อหาได้เฉพาะคนที่ล็อกอินและเป็น admin เท่านั้น
-- ================================================================

-- 1. ตาราง app_users — เพิ่ม role ให้กับ user ที่สมัครผ่าน Supabase Auth
create table if not exists public.app_users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member',  -- 'admin' | 'member'
  created_at timestamptz not null default now()
);

alter table public.app_users enable row level security;

-- 2. ให้ user อ่านข้อมูลตัวเองได้เท่านั้น (ตอน login แล้ว)
drop policy if exists "users can read own profile" on public.app_users;
create policy "users can read own profile" on public.app_users
  for select
  to authenticated
  using (id = auth.uid());

-- 3. function ตรวจสอบ role — เรียกจาก RLS policy
create or replace function public.get_user_role()
returns text
language sql
security definer
stable
as $$
  select coalesce(
    (select role from public.app_users where id = auth.uid()),
    'anon'
  );
$$;

-- 4. ลบ policy เดิม "allow all" ที่เปิดให้ทุกคนแก้ได้
drop policy if exists "allow all" on public.content_store;

-- 5. policy ใหม่: อ่านได้ทุกคน (ต้องล็อกอินก่อน)
drop policy if exists "content_store_select" on public.content_store;
create policy "content_store_select" on public.content_store
  for select
  to authenticated, anon
  using (true);

-- 6. policy ใหม่: แก้ไขได้เฉพาะ admin
drop policy if exists "content_store_admin_update" on public.content_store;
create policy "content_store_admin_update" on public.content_store
  for all
  to authenticated
  using (public.get_user_role() = 'admin')
  with check (public.get_user_role() = 'admin');

-- 7. หลังรันแล้ว ให้สร้างบัญชี admin:
--    ไปที่ Supabase Dashboard > Authentication > Users > Invite user
--    ใส่ email ของ admin แล้วกด Send invitation
--    ไปที่ Database > Tables > app_users แล้วใส่ role = 'admin'
--    ให้กับ user ที่สร้างไว้
