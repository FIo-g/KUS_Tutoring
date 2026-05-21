import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategory } from '@/lib/categories'
import { getSubjectsByCategory } from '@/lib/subjects'
import { CategoryKey } from '@/lib/types'
import SubjectCard from '@/components/catalog/SubjectCard'

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: key } = await params
  const category = getCategory(key as CategoryKey)
  if (!category) notFound()

  const subjects = getSubjectsByCategory(category.key)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-3">
          <span className="text-crimson-600 font-bold text-lg tracking-tight">컴카이브</span>
          <span className="text-slate-200">|</span>
          <span className="text-sm text-slate-500">고려대학교 세종캠퍼스</span>
          {/* TODO: 인증 구현 시 우측에 사용자 아바타 추가 */}
        </div>
      </header>

      <nav className="bg-slate-50 border-b border-slate-100 py-2">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-700 transition-colors">홈</Link>
          <span className="text-slate-300 select-none">›</span>
          <span className="text-slate-600 font-medium">{category.displayName}</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">{category.displayName}</h1>
          {category.description && (
            <p className="text-slate-500 text-sm">{category.description}</p>
          )}
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium mb-2">등록된 과목이 없습니다</p>
            <p className="text-sm">곧 추가될 예정입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map(subject => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
