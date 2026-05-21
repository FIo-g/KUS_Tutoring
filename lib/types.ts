export type TabKey = 'concepts' | 'quiz' | 'past-exams' | 'predicted'

export interface TabConfig {
  key: TabKey
  label: string
  path: string
}

// ── 카탈로그 ──────────────────────────────────────────────────────
export type CategoryKey =
  | 'major-required'   // 전공필수
  | 'major-elective'   // 전공선택
  | 'required-general' // 필수교양
  | 'core-general'     // 핵심교양
  | 'general'          // 일반교양

export interface Category {
  key: CategoryKey
  displayName: string
  description?: string
}

export interface Subject {
  slug: string
  displayName: string
  categoryKey: CategoryKey
  enabledTabs: TabKey[]
  // TODO: auth 연동 후 instructor, credits 등 추가
}

// ── 퀴즈 ──────────────────────────────────────────────────────────
export interface QuizQuestion {
  id: string
  question: string
  codeBlock?: string
  options: string[]
  correctIndex: number
  explanation?: string
  // MongoDB 연동 시 required 로 변경
  chapter?: number
}

export type AnswerState = 'unanswered' | 'correct' | 'incorrect'

export interface WrongAnswer {
  questionNumber: number   // 1-based (화면에 "Q3." 표시용)
  question: QuizQuestion
  selectedIndex: number
}

// ── 단원별 개념정리 ────────────────────────────────────────────────
export interface ConceptChapter {
  id: string
  chapterNumber: number
  title: string
  sections: ConceptSection[]
}

export interface ConceptSection {
  heading: string
  body: string   // markdown 문자열
}

// ── 기출 및 족보 ───────────────────────────────────────────────────
export type ExamType = 'midterm' | 'final'
export type Semester = '1' | '2'

export interface PastExam {
  id: string
  year: number
  semester: Semester
  type: ExamType
  title: string
  questions: PastExamQuestion[]
}

export interface PastExamQuestion {
  id: string
  number: number
  question: string
  codeBlock?: string
  options?: string[]      // undefined이면 주관식
  answer: string          // 객관식: "②", 주관식: 텍스트
  points?: number
  explanation?: string
  chapter?: number
}

// ── 시험 예상 문제 ─────────────────────────────────────────────────
export interface ExpectedQuestion {
  id: string
  question: string
  codeBlock?: string
  options?: string[]
  answer: string
  chapter?: number
  tags?: string[]
  explanation?: string
  // TODO: auth 연동 후 user-specific "복습 완료" 플래그 추가
}
