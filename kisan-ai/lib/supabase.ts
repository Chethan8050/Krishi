import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types ──────────────────────────────────────────────────────
export interface ScanRecord {
  id: string;
  crop: string;
  disease: string | null;
  status: 'healthy' | 'disease';
  confidence: number;
  severity: string | null;
  treatment: string[] | null;
  tips: string[] | null;
  image_url: string | null;
  created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────

/** Insert a new scan result into the `scans` table */
export async function saveScanResult(data: Omit<ScanRecord, 'id' | 'created_at'>) {
  const { error } = await supabase.from('scans').insert([data]);
  if (error) console.error('[Supabase] saveScanResult error:', error.message);
  return { error };
}

/** Fetch the most recent N scans (default 20) */
export async function fetchScanHistory(limit = 20): Promise<ScanRecord[]> {
  const { data, error } = await supabase
    .from('scans')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] fetchScanHistory error:', error.message);
    return [];
  }
  return (data as ScanRecord[]) || [];
}
