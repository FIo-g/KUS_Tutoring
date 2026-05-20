export type TabKey = 'concepts' | 'quiz' | 'past-exams' | 'predicted'

export interface TabConfig {
  key: TabKey
  label: string
  path: string
}

export interface Subject {
  slug: string
  displayName: string
  enabledTabs: TabKey[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type AnswerState = 'unanswered' | 'correct' | 'incorrect'
