'use client'

import { QuizQuestion } from '@/lib/types'
import { useQuiz } from '@/hooks/useQuiz'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import FeedbackBanner from './FeedbackBanner'
import ScoreSummary from './ScoreSummary'

interface QuizRunnerProps {
  questions: QuizQuestion[]
}

export default function QuizRunner({ questions }: QuizRunnerProps) {
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
