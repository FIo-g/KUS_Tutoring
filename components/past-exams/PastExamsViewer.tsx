'use client'

import { useState, useMemo } from 'react'
import { PastExam, PastExamQuestion } from '@/lib/types'

const OPTION_LABELS = ['①', '②', '③', '④', '⑤']

const EXAM_TYPE_LABEL: Record<string, string> = {
  midterm: '중간고사',
  final:   '기말고사',
}

interface PastExamsViewerProps {
  exams: PastExam[]
}

export default function PastExamsViewer({ exams }: PastExamsViewerProps) {
  const [selectedExamId, setSelectedExamId] = useState(exams[0]?.id ?? '')

  const selectedExam = exams.find(e => e.id === selectedExamId) ?? exams[0]

  return (
    <div>
      {/* 시험 선택 탭 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {exams.map(exam => (
          <button
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer ${
              selectedExamId === exam.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            {exam.title}
          </button>
        ))}
      </div>

      {selectedExam && <ExamViewer exam={selectedExam} />}
    </div>
  )
}

function ExamViewer({ exam }: { exam: PastExam }) {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const [revealAll, setRevealAll] = useState(false)

  const totalPoints = useMemo(
    () => exam.questions.reduce((s, q) => s + (q.points ?? 0), 0),
    [exam.questions],
  )

  const toggle = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const isRevealed = (id: string) => revealAll || revealedIds.has(id)

  return (
    <div>
      {/* 시험 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-800">{exam.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {EXAM_TYPE_LABEL[exam.type]} · 총 {exam.questions.length}문제
            {totalPoints > 0 && ` · ${totalPoints}점`}
          </p>
        </div>
        <button
          onClick={() => { setRevealAll(v => !v); setRevealedIds(new Set()) }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300 transition-all cursor-pointer"
        >
          {revealAll ? '정답 모두 숨기기' : '정답 모두 보기'}
        </button>
      </div>

      {/* 문제 목록 */}
      <div className="flex flex-col gap-4">
        {exam.questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            revealed={isRevealed(q.id)}
            onToggle={() => toggle(q.id)}
          />
        ))}
      </div>
    </div>
  )
}

function QuestionCard({
  question,
  revealed,
  onToggle,
}: {
  question: PastExamQuestion
  revealed: boolean
  onToggle: () => void
}) {
  const isMultipleChoice = Array.isArray(question.options) && question.options.length > 0

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* 문제 번호 + 배점 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            {question.number}
          </span>
          {question.chapter !== undefined && (
            <span className="text-xs text-slate-400">Ch.{question.chapter}</span>
          )}
        </div>
        {question.points !== undefined && (
          <span className="text-xs font-semibold text-slate-400">[{question.points}점]</span>
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
      <div>
        <button
          onClick={onToggle}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 cursor-pointer"
        >
          {revealed ? '정답 숨기기' : '정답 보기'}
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
    </div>
  )
}
