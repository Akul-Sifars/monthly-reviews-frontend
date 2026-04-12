export interface Question {
  id: number;
  question_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  question: Question;
  answer: string;
  review_month: string;
  browser_id: string;
  submitted_at: string;
}

export interface Answer {
  questionId: number;
  text: string;
}

export interface AuthResponse {
  success: boolean;
  access_token?: string;
  message: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
}

export interface SubmissionStatus {
  hasSubmitted: boolean;
}

export interface ReviewStats {
  totalReviews: number;
  currentMonthReviews: number;
  monthlyBreakdown: Array<{
    month: string;
    count: number;
  }>;
}
