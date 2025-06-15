
export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface ApiResponse {
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

export interface SummaryResponse {
  summary: string;
}

// Add types for other API responses
export interface ComparisonResponse {
  comparison_result: string;
}

export interface VoiceSearchResponse {
  transcribed_keyword: string;
  search_result: string;
}

export interface QAResponse {
  answers: Array<{
    question: string;
    answer: string;
  }>;
}

export interface EncodeDecodeResponse {
  result: string;
}

export interface TranslationResponse {
  translated_text: string;
}
