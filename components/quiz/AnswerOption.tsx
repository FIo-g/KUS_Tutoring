'use client'

import { AnswerState } from '@/lib/types'

interface AnswerOptionProps {
  index: number
  text: string
  correctIndex: number
  selectedIndex: number | null
  answerState: AnswerState
  onSelect: (index: number) => void
}

const LABELS = ['①', '②', '③', '④']

function getClasses(
  index: number,
  correctIndex: number,
  selectedIndex: number | null,
  answerState: AnswerState,
): string {
  const base =
    'w-full text-left flex items-center gap-3 px-5 py-4 rounded-xl border-2 transition-all duration-200 text-base'

  if (answerState === 'unanswered') {
    return `${base} border-slate-200 bg-white hover:border-crimson-400 hover:bg-crimson-50 cursor-pointer`
  }

  if (index === correctIndex) {
    return `${base} border-green-500 bg-green-50 text-green-800`
  }
  if (index === selectedIndex) {
    return `${base} border-red-400 bg-red-50 text-red-800`
  }
  return `${base} border-slate-100 bg-slate-50 text-slate-400`
}

export default function AnswerOption({
  index,
  text,
  correctIndex,
  selectedIndex,
  answerState,
  onSelect,
}: AnswerOptionProps) {
  const isAnswered = answerState !== 'unanswered'

  return (
    <button
      className={getClasses(index, correctIndex, selectedIndex, answerState)}
      onClick={() => !isAnswered && onSelect(index)}
      disabled={isAnswered}
    >
      <span className="font-bold text-lg shrink-0 w-6 text-center">
        {LABELS[index]}
      </span>
      <span className="flex-1">{text}</span>
      {isAnswered && index === correctIndex && (
        <span className="shrink-0 text-green-600 font-bold text-lg">✓</span>
      )}
      {isAnswered && index === selectedIndex && index !== correctIndex && (
        <span className="shrink-0 text-red-500 font-bold text-lg">✗</span>
      )}
    </button>
  )
}
