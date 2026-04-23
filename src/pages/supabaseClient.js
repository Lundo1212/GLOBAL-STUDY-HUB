import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qbxpearokrsdlwhzqtmo.supabase.co";
const supabaseKey = "sb_publishable_IdL0ScbLasQGYi9cBtQc2Q_MkxLq1lK";

export const supabase = createClient(supabaseUrl, supabaseKey);