-- ══════════════════════════════════════════════════════════════════
-- MIGRACIÓN: leads — agregar columna phone
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════════

alter table public.leads
  add column if not exists phone text;
