import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://iedbpfpeymekbyhojilj.supabase.co",
  "YOUR_ANON_KEY"
);