'use client'

import { useState } from 'react'
import { QuizQuestion } from '@/lib/types'
import { useQuiz } from '@/hooks/useQuiz'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import FeedbackBanner from './FeedbackBanner'
import ScoreSummary from './ScoreSummary'
import ChapterSelect, { ChapterKey, filterByChapter } from './ChapterSelect'

interface QuizRunnerProps {
  questions: QuizQuestion[]
}

// 챕터 선택 후 실제 퀴즈를 담당하는 내부 컴포넌트
// 분리함으로써 챕터가 바뀔 때 useQuiz 상태가 자동으로 초기화됨
function ActiveQuiz({
  questions,
  onBackToChapters,
}: {
  questions: QuizQuestion[]
  onBackToChapters: () => void
}) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    selectedIndex,
    answerState,
    isComplete,
    wrongAnswers,
    isLastQuestion,
    selectAnswer,
    nextQuestion,
    restart,
  } = useQuiz(questions)

  if (isComplete) {
    return (
      <ScoreSummary
        score={score}
        total={totalQuestions}
        wrongAnswers={wrongAnswers}
        onRestart={restart}
        onBackToChapters={onBackToChapters}
      />
    )
  }

  return (
    <div>
      <ProgressBar current={currentIndex} total={totalQuestions} />
      <QuestionCard
        question={currentQuestion}
        selectedIndex={selectedIndex}
        answerState={answerState}
        onSelect={selectAnswer}
      />
      <FeedbackBanner
        answerState={answerState}
        explanation={currentQuestion.explanation}
        isLastQuestion={isLastQuestion}
        onNext={nextQuestion}
      />
    </div>
  )
}

export default function QuizRunner({ questions }: QuizRunnerProps) {
  const [selectedChapter, setSelectedChapter] = useState<ChapterKey | null>(null)

  if (!selectedChapter) {
    return <ChapterSelect questions={questions} onSelect={setSelectedChapter} />
  }

  const filteredQuestions = filterByChapter(questions, selectedChapter)

  return (
    <ActiveQuiz
      key={String(selectedChapter)}
      questions={filteredQuestions}
      onBackToChapters={() => setSelectedChapter(null)}
    />
  )
}
