import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import { getCategory } from '@/lib/categories'
import TopNav from '@/components/nav/TopNav'
import TabBar from '@/components/nav/TabBar'
import Breadcrumb from '@/components/nav/Breadcrumb'

interface SubjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ subject: string }>
}

export default async function SubjectLayout({ children, params }: SubjectLayoutProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const category = getCategory(subject.categoryKey)
  if (!category) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav subject={subject} />
      <Breadcrumb subject={subject} category={category} />
      <TabBar subject={subject} />
      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
