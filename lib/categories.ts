import { Category, CategoryKey } from './types'
import { ALL_SUBJECTS } from './subjects'

export const ALL_CATEGORIES: Category[] = [
  { key: 'major-required',   displayName: '전공필수',  description: '전공 이수를 위해 반드시 수강해야 하는 과목' },
  { key: 'major-elective',   displayName: '전공선택',  description: '전공 내에서 선택적으로 수강하는 과목' },
  { key: 'required-general', displayName: '필수교양',  description: '전교생이 이수해야 하는 교양 과목' },
  { key: 'core-general',     displayName: '핵심교양',  description: '학교 지정 핵심 역량 교양 과목' },
  { key: 'general',          displayName: '일반교양',  description: '자유롭게 선택할 수 있는 교양 과목' },
]

export function getCategory(key: CategoryKey): Category | undefined {
  return ALL_CATEGORIES.find(c => c.key === key)
}

export function getSubjectsByCategory(categoryKey: CategoryKey) {
  return ALL_SUBJECTS.filter(s => s.categoryKey === categoryKey)
}
