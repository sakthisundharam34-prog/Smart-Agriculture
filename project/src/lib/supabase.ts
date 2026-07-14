import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  location: string | null;
  occupation: string | null;
  avatar_url: string | null;
  language: string;
  theme: string;
};

export type Report = {
  id: string;
  user_id: string;
  type: 'disease' | 'soil' | 'crop' | 'fertilizer' | 'irrigation';
  title: string;
  summary: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
};

export type MarketPrice = {
  id: string;
  crop_name: string;
  current_price: number;
  yesterday_price: number;
  unit: string;
  trend: string;
  region: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  category: string;
  read: boolean;
  created_at: string;
};
