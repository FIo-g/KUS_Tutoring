import { ALL_CATEGORIES, getSubjectsByCategory } from '@/lib/categories'
import CategoryCard from '@/components/catalog/CategoryCard'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-3">
          <span className="text-crimson-600 font-bold text-lg tracking-tight">컴카이브</span>
          <span className="text-slate-200">|</span>
          <span className="text-sm text-slate-500">고려대학교 세종캠퍼스</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">과목 카탈로그</h1>
        <p className="text-slate-500 text-sm mb-10">수강 중인 과목의 카테고리를 선택하세요.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_CATEGORIES.map(category => {
            const subjects = getSubjectsByCategory(category.key)
            return (
              <CategoryCard
                key={category.key}
                category={category}
                subjectCount={subjects.length}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
