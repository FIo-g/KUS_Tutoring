'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TabConfig, Subject } from '@/lib/types'

// 탭 순서 변경 또는 새 탭 추가 시 이 배열만 수정
const TABS: TabConfig[] = [
  { key: 'concepts',   label: '단원별 개념정리', path: 'concepts'   },
  { key: 'quiz',       label: '퀴즈',            path: 'quiz'       },
  { key: 'past-exams', label: '기출 및 족보',     path: 'past-exams' },
  { key: 'predicted',  label: '시험 예상 문제',   path: 'predicted'  },
]

interface TabBarProps {
  subject: Subject
}

export default function TabBar({ subject }: TabBarProps) {
  const pathname = usePathname()

  return (
    <nav className="sticky top-16 z-40 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex">
          {TABS.map(tab => {
            const isEnabled = subject.enabledTabs.includes(tab.key)
            const href = `/subjects/${subject.slug}/${tab.path}`
            const isActive = pathname === href

            if (!isEnabled) {
              return (
                <span
                  key={tab.key}
                  title="준비 중"
                  className="px-5 py-4 text-sm font-medium text-slate-300 cursor-not-allowed select-none border-b-2 border-transparent"
                >
                  {tab.label}
                </span>
              )
            }

            return (
              <Link
                key={tab.key}
                href={href}
                className={`
                  px-5 py-4 text-sm font-medium border-b-2 transition-colors duration-150 whitespace-nowrap
                  ${isActive
                    ? 'border-crimson-600 text-crimson-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }
                `}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
