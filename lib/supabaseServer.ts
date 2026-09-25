import { createClient } from "@supabase/supabase-js";

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://placeholder.supabase.co";

// Uses SUPABASE_SERVICE_ROLE_KEY for administrative operations, with fallback to anon key or placeholder
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-key";

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Fallback / seed defaults for Supabase site content
 */
export const defaultSiteSeedData = {
  heroHeadline: "Metrology-Grade 3D Scanning & Multi-Color 3D Printing",
  heroSubtitle:
    "Local 3D scanning down to 0.02mm precision and rapid additive manufacturing in Bangor, PA. Zero shipping risks, fast local pickup, and personal engineering support.",
  phone: "(570) 243-1673",
  phoneRaw: "+15702431673",
  address: "Bangor, PA 18013 | Slate Belt Region",
};
