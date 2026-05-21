import { Subject, CategoryKey } from './types'
// 새 과목 추가 시 이 파일에 import 한 줄만 추가하면 됩니다.
import { computerLanguage1 } from '@/content/subjects/computer-language-1/meta'

export const ALL_SUBJECTS: Subject[] = [
  computerLanguage1,
]

export function getSubject(slug: string): Subject | undefined {
  return ALL_SUBJECTS.find(s => s.slug === slug)
}

export function getSubjectsByCategory(categoryKey: CategoryKey): Subject[] {
  return ALL_SUBJECTS.filter(s => s.categoryKey === categoryKey)
}
