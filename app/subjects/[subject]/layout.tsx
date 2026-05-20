import { notFound } from 'next/navigation'
import { getSubject } from '@/lib/subjects'
import TopNav from '@/components/nav/TopNav'
import TabBar from '@/components/nav/TabBar'

interface SubjectLayoutProps {
  children: React.ReactNode
  params: Promise<{ subject: string }>
}

export default async function SubjectLayout({ children, params }: SubjectLayoutProps) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav subject={subject} />
      <TabBar subject={subject} />
      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  )
}
