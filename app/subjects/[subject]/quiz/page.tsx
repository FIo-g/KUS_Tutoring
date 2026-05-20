import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import { questions as cl1Questions } from '@/content/subjects/computer-language-1/quiz'
import QuizRunner from '@/components/quiz/QuizRunner'
import { QuizQuestion } from '@/lib/types'

interface PageProps {
  params: Promise<{ subject: string }>
}

// 새 과목 추가 시 이 맵에 항목 추가
const questionMap: Record<string, QuizQuestion[]> = {
  'computer-language-1': cl1Questions,
}

export default async function QuizPage({ params }: PageProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject || !subject.enabledTabs.includes('quiz')) notFound()

  const questions = questionMap[slug]
  if (!questions) notFound()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h1 className="text-lg font-bold text-slate-800 mb-8">퀴즈</h1>
        <QuizRunner questions={questions} />
      </div>
    </div>
  )
}
