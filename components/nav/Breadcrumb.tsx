'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Subject, Category } from '@/lib/types'

const TAB_LABELS: Record<string, string> = {
  concepts:    '단원별 개념정리',
  quiz:        '퀴즈',
  'past-exams':'기출 및 족보',
  predicted:   '시험 예상 문제',
}

interface BreadcrumbProps {
  subject: Subject
  category: Category
}

export default function Breadcrumb({ subject, category }: BreadcrumbProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const tabSlug = segments[segments.length - 1]
  const tabLabel = TAB_LABELS[tabSlug]

  return (
    <nav className="bg-slate-50 border-b border-slate-100 py-2">
      <div className="max-w-5xl mx-auto px-6 flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
        <Link href="/" className="hover:text-slate-700 transition-colors">홈</Link>
        <Chevron />
        <Link
          href={`/categories/${subject.categoryKey}`}
          className="hover:text-slate-700 transition-colors"
        >
          {category.displayName}
        </Link>
        <Chevron />
        <Link
          href={`/subjects/${subject.slug}/${subject.enabledTabs[0]}`}
          className="hover:text-slate-700 transition-colors"
        >
          {subject.displayName}
        </Link>
        {tabLabel && (
          <>
            <Chevron />
            <span className="text-slate-600 font-medium">{tabLabel}</span>
          </>
        )}
      </div>
    </nav>
  )
}

function Chevron() {
  return <span className="text-slate-300 select-none">›</span>
}
