import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = 'https://mfvbtlormnveloqnzeqf.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mdmJ0bG9ybW52ZWxvcW56ZXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDc2ODIsImV4cCI6MjA5MTA4MzY4Mn0.54iLaKQr9xZgo_ttm_dcWglEaJ7KukzxAsXLswBj_Uc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
