import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojyqegpdcovbpljofnle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeXFlZ3BkY292YnBsam9mbmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDc4MzQsImV4cCI6MjA3NjUyMzgzNH0.pmR0F97GSbC5G8tc0629m9V_SEHpFC08taRZvT4OKus';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Church {
  id: string;
  name: string;
  pastor_name: string;
  pastor_email: string;
  location: string | null;
  denomination: string | null;
  member_count: number;
  status: string;
  referral_code: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  church_id: string | null;
  role: string;
  status: string;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  category: string;
  price_min: number | null;
  price_max: number | null;
  price_type: string;
  location: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

