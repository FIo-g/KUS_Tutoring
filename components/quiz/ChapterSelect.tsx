'use client'

import { QuizQuestion } from '@/lib/types'

export type ChapterKey = 'all' | 'basics' | 7 | 8 | 9

interface ChapterInfo {
  key: ChapterKey
  title: string
  subtitle: string
  textColor: string
  bgColor: string
  borderColor: string
  dotColor: string
}

const CHAPTER_INFO: ChapterInfo[] = [
  {
    key: 'all',
    title: '전체 문제',
    subtitle: '모든 챕터',
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100',
    borderColor: 'border-indigo-200',
    dotColor: 'bg-indigo-400',
  },
  {
    key: 'basics',
    title: '기초 문법',
    subtitle: 'Ch.1 ~ 6',
    textColor: 'text-slate-700',
    bgColor: 'bg-slate-50 hover:bg-slate-100',
    borderColor: 'border-slate-200',
    dotColor: 'bg-slate-400',
  },
  {
    key: 7,
    title: '배열',
    subtitle: 'Chapter 7',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100',
    borderColor: 'border-emerald-200',
    dotColor: 'bg-emerald-400',
  },
  {
    key: 8,
    title: '포인터',
    subtitle: 'Chapter 8',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
    borderColor: 'border-amber-200',
    dotColor: 'bg-amber-400',
  },
  {
    key: 9,
    title: '문자열',
    subtitle: 'Chapter 9',
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50 hover:bg-rose-100',
    borderColor: 'border-rose-200',
    dotColor: 'bg-rose-400',
  },
]

export function filterByChapter(questions: QuizQuestion[], key: ChapterKey): QuizQuestion[] {
  if (key === 'all') return questions
  if (key === 'basics') return questions.filter(q => q.chapter !== undefined && q.chapter < 7)
  return questions.filter(q => q.chapter === key)
}

interface ChapterSelectProps {
  questions: QuizQuestion[]
  onSelect: (key: ChapterKey) => void
}

export default function ChapterSelect({ questions, onSelect }: ChapterSelectProps) {
  return (
    <div className="py-8">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-1">
        퀴즈 시작
      </p>
      <h2 className="text-xl font-bold text-slate-800 text-center mb-8">
        챕터를 선택하세요
      </h2>

      <div className="flex flex-col gap-3">
        {CHAPTER_INFO.map(info => {
          const count = filterByChapter(questions, info.key).length
          return (
            <button
              key={String(info.key)}
              onClick={() => onSelect(info.key)}
              className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 ${info.bgColor} ${info.borderColor} transition-all cursor-pointer text-left`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${info.dotColor}`} />
                <div>
                  <p className={`text-xs font-medium ${info.textColor} opacity-60 mb-0.5`}>
                    {info.subtitle}
                  </p>
                  <p className={`font-bold text-base ${info.textColor}`}>{info.title}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${info.textColor} opacity-50`}>
                {count}문제
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
