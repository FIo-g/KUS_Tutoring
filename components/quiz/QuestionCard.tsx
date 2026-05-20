import { QuizQuestion, AnswerState } from '@/lib/types'
import AnswerOption from './AnswerOption'

interface QuestionCardProps {
  question: QuizQuestion
  selectedIndex: number | null
  answerState: AnswerState
  onSelect: (index: number) => void
}

export default function QuestionCard({
  question,
  selectedIndex,
  answerState,
  onSelect,
}: QuestionCardProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4 leading-relaxed">
        {question.question}
      </h2>

      {question.codeBlock && (
        <pre className="bg-slate-900 text-slate-100 rounded-xl px-5 py-4 mb-6 text-sm font-mono leading-relaxed overflow-x-auto border border-slate-700">
          {question.codeBlock}
        </pre>
      )}

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            index={index}
            text={option}
            correctIndex={question.correctIndex}
            selectedIndex={selectedIndex}
            answerState={answerState}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
