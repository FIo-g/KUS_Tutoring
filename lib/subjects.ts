import { Subject, CategoryKey } from './types'
// 콘텐츠가 있는 과목만 별도 meta.ts 파일로 관리
// 콘텐츠 추가 시: content/subjects/[slug]/meta.ts 생성 후 아래 import로 교체
import { computerLanguage1 } from '@/content/subjects/computer-language-1/meta'

// 고려대학교 세종캠퍼스 컴퓨터소프트웨어학과 교육과정
// 출처: 웹 검색 기반 (https://software.korea.ac.kr)
// enabledTabs: [] 인 과목은 카드에 "준비 중" 표시됨
const COURSE_CATALOG: Subject[] = [
  // ── 전공필수 ────────────────────────────────
  { slug: 'data-structures',        displayName: '자료구조',           categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'algorithms',             displayName: '알고리즘',           categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'operating-systems',      displayName: '운영체제',           categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'database',               displayName: '데이터베이스',       categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'oop',                    displayName: '객체지향프로그래밍', categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'software-analysis',      displayName: '소프트웨어분석설계', categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'capstone-design',        displayName: '캡스톤디자인',       categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'artificial-intelligence',displayName: '인공지능',           categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'regression-analysis',    displayName: '회귀분석',           categoryKey: 'major-required', enabledTabs: [] },

  // ── 전공선택 ────────────────────────────────
  { slug: 'python-programming',     displayName: '파이썬프로그래밍',   categoryKey: 'major-elective', enabledTabs: [] },
  { slug: 'advanced-programming',   displayName: '고급프로그래밍',     categoryKey: 'major-elective', enabledTabs: [] },
  { slug: 'unix-systems',           displayName: '유닉스시스템프로그래밍', categoryKey: 'major-elective', enabledTabs: [] },

  // ── 필수교양 ────────────────────────────────
  computerLanguage1, // enabledTabs: ['quiz'] — 퀴즈 콘텐츠 있음
]

export const ALL_SUBJECTS: Subject[] = COURSE_CATALOG

export function getSubject(slug: string): Subject | undefined {
  return ALL_SUBJECTS.find(s => s.slug === slug)
}

export function getSubjectsByCategory(categoryKey: CategoryKey): Subject[] {
  return ALL_SUBJECTS.filter(s => s.categoryKey === categoryKey)
}
