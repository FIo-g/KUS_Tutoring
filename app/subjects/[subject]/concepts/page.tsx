import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import { ConceptChapter } from '@/lib/types'
import ConceptsViewer from '@/components/concepts/ConceptsViewer'

interface PageProps {
  params: Promise<{ subject: string }>
}

// 새 과목 개념 정리 추가 시 이 맵에 항목 추가
const conceptsMap: Record<string, ConceptChapter[]> = {
  'computer-language-1': (await import('@/content/subjects/computer-language-1/concepts')).concepts,
}

export default async function ConceptsPage({ params }: PageProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject || !subject.enabledTabs.includes('concepts')) notFound()

  const chapters = conceptsMap[slug]
  if (!chapters || chapters.length === 0) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-slate-800 mb-1">단원별 개념정리</h1>
        <p className="text-sm text-slate-500">챕터를 클릭해 핵심 개념을 확인하세요.</p>
      </div>
      <ConceptsViewer chapters={chapters} />
    </div>
  )
}
