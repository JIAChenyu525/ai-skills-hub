import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ybbepmotbitjrpsvsics.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYmVwbW90Yml0anJwc3ZzaWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwMTU2MzksImV4cCI6MjA5NjU5MTYzOX0.iuJu5TUHQ3TdQb5hCSqb_Ie3XGOa5f2V_IWRPoTn77g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
