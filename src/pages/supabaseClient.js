import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iedbpfpeymekbyhojilj.supabase.co";

const supabaseAnonKey =
  "sb_publishable_L2mQFwRSohBlgmuGtf8XTg_i9u_aQfg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);