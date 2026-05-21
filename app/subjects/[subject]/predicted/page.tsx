import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import { ExpectedQuestion } from '@/lib/types'
import PredictedViewer from '@/components/predicted/PredictedViewer'

interface PageProps {
  params: Promise<{ subject: string }>
}

// 새 과목 예상 문제 추가 시 이 맵에 항목 추가
const predictedMap: Record<string, ExpectedQuestion[]> = {
  'computer-language-1': (await import('@/content/subjects/computer-language-1/predicted')).predictedQuestions,
}

export default async function PredictedPage({ params }: PageProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject || !subject.enabledTabs.includes('predicted')) notFound()

  const questions = predictedMap[slug]
  if (!questions || questions.length === 0) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-slate-800 mb-1">시험 예상 문제</h1>
        <p className="text-sm text-slate-500">챕터 또는 주제로 필터링하고 답안을 확인하세요.</p>
      </div>
      <PredictedViewer questions={questions} />
    </div>
  )
}
