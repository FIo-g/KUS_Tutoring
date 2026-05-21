import Link from 'next/link'
import { Category } from '@/lib/types'

const COLOR_MAP: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  'major-required':   { bg: 'bg-crimson-50', border: 'border-crimson-200', dot: 'bg-crimson-400', text: 'text-crimson-800' },
  'major-elective':   { bg: 'bg-violet-50',  border: 'border-violet-200', dot: 'bg-violet-400', text: 'text-violet-800'},
  'required-general': { bg: 'bg-emerald-50', border: 'border-emerald-200',dot: 'bg-emerald-400',text: 'text-emerald-800'},
  'core-general':     { bg: 'bg-amber-50',   border: 'border-amber-200',  dot: 'bg-amber-400',  text: 'text-amber-800' },
  'general':          { bg: 'bg-slate-50',   border: 'border-slate-200',  dot: 'bg-slate-400',  text: 'text-slate-700' },
}

interface CategoryCardProps {
  category: Category
  subjectCount: number
}

export default function CategoryCard({ category, subjectCount }: CategoryCardProps) {
  const c = COLOR_MAP[category.key] ?? COLOR_MAP['general']

  return (
    <Link
      href={`/categories/${category.key}`}
      className={`block rounded-2xl border-2 ${c.bg} ${c.border} p-6 hover:shadow-md transition-all duration-150 group`}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`} />
        <h2 className={`font-bold text-lg ${c.text}`}>{category.displayName}</h2>
      </div>
      {category.description && (
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{category.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${c.text} opacity-60`}>
          {subjectCount > 0 ? `${subjectCount}개 과목` : '과목 없음'}
        </span>
        <span className={`text-sm font-bold ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
          →
        </span>
      </div>
    </Link>
  )
}
