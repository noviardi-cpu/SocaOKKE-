
export enum AgeGroup {
  TPA_0_1 = 'TPA/Daycare (0-1 Tahun)',
  TPA_1_2 = 'TPA/Daycare (1-2 Tahun)',
  KOBER_2_3 = 'Kober/KB (2-3 Tahun)',
  KOBER_3_4 = 'Kober/KB (3-4 Tahun)',
  TK_A = 'TK A (4-5 Tahun)',
  TK_B = 'TK B (5-6 Tahun)'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface TeacherPreferences {
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  ageGroup: AgeGroup;
  theme: string;
}

export interface ThemeExplanation {
  title: string;
  discipline: string;
  concept: string;
  description: string;
  somantriInsight: string;
  okkeRelevance: string;
  paudImplementation: string;
  psychologicalContext: string; // New field for detailed age-based psychological breakdown
}
