import Link from 'next/link'
import { Subject } from '@/lib/types'

const TAB_LABELS: Record<string, string> = {
  concepts:    '개념정리',
  quiz:        '퀴즈',
  'past-exams':'기출',
  predicted:   '예상문제',
}

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const firstTab = subject.enabledTabs[0]

  // 콘텐츠가 없는 과목은 비활성 카드로 표시
  if (!firstTab) {
    return (
      <div className="block bg-white rounded-2xl border border-slate-200 p-6 opacity-60 cursor-default">
        <h3 className="font-bold text-slate-800 text-lg mb-3">{subject.displayName}</h3>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-400">
          준비 중
        </span>
      </div>
    )
  }

  return (
    <Link
      href={`/subjects/${subject.slug}/${firstTab}`}
      className="block bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-150 group"
    >
      <h3 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-crimson-600 transition-colors">
        {subject.displayName}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {subject.enabledTabs.map(tab => (
          <span
            key={tab}
            className="px-2 py-0.5 rounded-full text-xs font-medium bg-crimson-50 text-crimson-600"
          >
            {TAB_LABELS[tab] ?? tab}
          </span>
        ))}
      </div>
    </Link>
  )
}
