import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust check to prevent fatal crashes during module loading
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL: Supabase environment variables are missing!");
  if (typeof window !== 'undefined') {
    console.warn("Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env or Vercel settings.");
  }
}

// Export a robust client instance - it will only throw when a request is actually made, not during import
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : { 
      from: () => ({ 
        select: () => ({ order: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        delete: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") })
      }),
      auth: { 
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    };

