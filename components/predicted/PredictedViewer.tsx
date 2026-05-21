'use client'

import { useState, useMemo } from 'react'
import { ExpectedQuestion } from '@/lib/types'

const OPTION_LABELS = ['①', '②', '③', '④', '⑤']

interface PredictedViewerProps {
  questions: ExpectedQuestion[]
}

export default function PredictedViewer({ questions }: PredictedViewerProps) {
  const [filterChapter, setFilterChapter] = useState<number | 'all'>('all')
  const [filterTag, setFilterTag]         = useState<string>('all')

  const chapters = useMemo(() => {
    const nums = [...new Set(questions.map(q => q.chapter).filter((c): c is number => c !== undefined))]
    return nums.sort((a, b) => a - b)
  }, [questions])

  const tags = useMemo(() => {
    const all = questions.flatMap(q => q.tags ?? [])
    return [...new Set(all)].sort()
  }, [questions])

  const filtered = useMemo(() => {
    return questions.filter(q => {
      if (filterChapter !== 'all' && q.chapter !== filterChapter) return false
      if (filterTag !== 'all' && !(q.tags ?? []).includes(filterTag)) return false
      return true
    })
  }, [questions, filterChapter, filterTag])

  return (
    <div>
      {/* 필터 */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* 챕터 필터 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase">챕터</span>
          <div className="flex gap-1.5">
            <FilterChip
              label="전체"
              active={filterChapter === 'all'}
              onClick={() => setFilterChapter('all')}
            />
            {chapters.map(ch => (
              <FilterChip
                key={ch}
                label={`Ch.${ch}`}
                active={filterChapter === ch}
                onClick={() => setFilterChapter(ch)}
              />
            ))}
          </div>
        </div>

        {/* 태그 필터 */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">주제</span>
            <div className="flex gap-1.5 flex-wrap">
              <FilterChip
                label="전체"
                active={filterTag === 'all'}
                onClick={() => setFilterTag('all')}
              />
              {tags.map(tag => (
                <FilterChip
                  key={tag}
                  label={tag}
                  active={filterTag === tag}
                  onClick={() => setFilterTag(tag)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 문제 수 */}
      <p className="text-xs text-slate-400 mb-4">{filtered.length}개 문제</p>

      {/* 문제 목록 */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">
          해당 조건의 문제가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((q, idx) => (
            <ExpectedQuestionCard key={q.id} question={q} number={idx + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
        active
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  )
}

function ExpectedQuestionCard({
  question,
  number,
}: {
  question: ExpectedQuestion
  number: number
}) {
  const [revealed, setRevealed] = useState(false)
  const isMultipleChoice = Array.isArray(question.options) && question.options.length > 0

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
            {number}
          </span>
          {question.chapter !== undefined && (
            <span className="text-xs text-slate-400">Ch.{question.chapter}</span>
          )}
        </div>
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end">
            {question.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 문제 */}
      <p className="text-slate-800 font-medium mb-4 leading-relaxed">{question.question}</p>

      {/* 코드블록 */}
      {question.codeBlock && (
        <pre className="bg-slate-900 text-slate-100 rounded-xl px-5 py-4 mb-4 text-xs font-mono leading-relaxed overflow-x-auto border border-slate-700">
          {question.codeBlock}
        </pre>
      )}

      {/* 선택지 */}
      {isMultipleChoice && (
        <div className="flex flex-col gap-2 mb-4">
          {question.options!.map((opt, i) => {
            const isCorrect = revealed && question.answer === OPTION_LABELS[i]
            return (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm transition-colors ${
                  isCorrect
                    ? 'border-green-300 bg-green-50 text-green-800'
                    : 'border-slate-100 bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`font-bold shrink-0 ${isCorrect ? 'text-green-600' : 'text-slate-400'}`}>
                  {OPTION_LABELS[i]}
                </span>
                {opt}
              </div>
            )
          })}
        </div>
      )}

      {/* 정답 토글 */}
      {/* TODO: auth 연동 후 "복습 완료" 체크 버튼 추가 */}
      <button
        onClick={() => setRevealed(v => !v)}
        className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 cursor-pointer"
      >
        {revealed ? '답안 숨기기' : '답안 보기'}
      </button>

      {revealed && (
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-green-50 border-2 border-green-200">
            <span className="text-green-600 font-bold text-sm shrink-0">정답</span>
            <span className="text-green-800 text-sm font-medium whitespace-pre-line">
              {question.answer}
            </span>
          </div>
          {question.explanation && (
            <div className="px-4 py-3 rounded-xl bg-white border border-slate-200">
              <p className="text-xs font-semibold text-slate-400 mb-1">해설</p>
              <p className="text-sm text-slate-600 leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
