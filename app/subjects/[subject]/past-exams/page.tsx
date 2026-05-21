import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import { PastExam } from '@/lib/types'
import PastExamsViewer from '@/components/past-exams/PastExamsViewer'

interface PageProps {
  params: Promise<{ subject: string }>
}

// 새 과목 기출 추가 시 이 맵에 항목 추가
const pastExamsMap: Record<string, PastExam[]> = {
  'computer-language-1': (await import('@/content/subjects/computer-language-1/past-exams')).pastExams,
}

export default async function PastExamsPage({ params }: PageProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject || !subject.enabledTabs.includes('past-exams')) notFound()

  const exams = pastExamsMap[slug]
  if (!exams || exams.length === 0) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-slate-800 mb-1">기출 및 족보</h1>
        <p className="text-sm text-slate-500">시험을 선택하고 문제별로 정답을 확인하세요.</p>
      </div>
      <PastExamsViewer exams={exams} />
    </div>
  )
}
