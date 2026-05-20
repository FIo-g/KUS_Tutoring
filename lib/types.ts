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
  // 문제에 딸린 C 코드 (pre 블록으로 렌더링)
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
