import { createClient } from '@supabase/supabase-js'

// Use local development environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WebhookRow = {
  id: string
  github_id: string
  event_type: string
  repository: string | null
  sender: string | null
  payload: Record<string, unknown>
  headers: Record<string, string> | null
  created_at: string
  updated_at: string
}
