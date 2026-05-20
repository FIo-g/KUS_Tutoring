import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ subject: string }>
}

export default async function SubjectPage({ params }: PageProps) {
  const { subject } = await params
  redirect(`/subjects/${subject}/quiz`)
}
