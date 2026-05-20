import { AnswerState } from '@/lib/types'
import Button from '@/components/ui/Button'

interface FeedbackBannerProps {
  answerState: AnswerState
  explanation?: string
  isLastQuestion: boolean
  onNext: () => void
}

export default function FeedbackBanner({
  answerState,
  explanation,
  isLastQuestion,
  onNext,
}: FeedbackBannerProps) {
  if (answerState === 'unanswered') return null

  const isCorrect = answerState === 'correct'

  return (
    <div
      className={`mt-6 p-4 rounded-xl border flex items-center justify-between gap-4 ${
        isCorrect
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-200'
      }`}
    >
      <div>
        <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {isCorrect ? '🎉 정답입니다!' : '😢 오답입니다'}
        </p>
        {explanation && (
          <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {explanation}
          </p>
        )}
      </div>
      <Button size="sm" onClick={onNext} className="shrink-0">
        {isLastQuestion ? '결과 보기' : '다음 문제 →'}
      </Button>
    </div>
  )
}
