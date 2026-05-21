import { Subject, CategoryKey } from './types'
// 콘텐츠가 있는 과목만 별도 meta.ts 파일로 관리
// 콘텐츠 추가 시: content/subjects/[slug]/meta.ts 생성 후 아래 import로 교체
import { computerLanguage1 } from '@/content/subjects/computer-language-1/meta'

// 고려대학교 세종캠퍼스 컴퓨터소프트웨어학과 전공체계도
// 파란색 = 필수교양 | 주황색 = 전공필수
// enabledTabs: [] 과목은 카드에 "준비 중" 표시됨

const COURSE_CATALOG: Subject[] = [
  // ── 필수교양 (파란색) ────────────────────────
  computerLanguage1, // 컴퓨터언어I — enabledTabs: ['quiz'] (퀴즈 콘텐츠 있음)
  { slug: 'computer-language-lab-1',  displayName: '컴퓨터언어실습I',      categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'computer-language-2',      displayName: '컴퓨터언어II',          categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'computer-language-lab-2',  displayName: '컴퓨터언어실습II',      categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'python',                   displayName: '파이썬',                categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'calculus',                 displayName: '일반미적분학및연습',     categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'basic-calculus',           displayName: '기초미적분학및연습',     categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'general-chemistry-1',      displayName: '일반화학1',             categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'general-chemistry-2',      displayName: '일반화학2',             categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'general-chemistry-lab-1',  displayName: '일반화학실험1',         categoryKey: 'required-general', enabledTabs: [] },
  { slug: 'general-chemistry-lab-2',  displayName: '일반화학실험2',         categoryKey: 'required-general', enabledTabs: [] },

  // ── 전공필수 (주황색) ────────────────────────
  { slug: 'data-structures',          displayName: '자료구조',              categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'probability-statistics',   displayName: '확률및통계',            categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'discrete-math',            displayName: '이산구조및연습',         categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'algorithms',               displayName: '알고리즘',              categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'linear-algebra',           displayName: '전산선형대수학',         categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'operating-systems',        displayName: '운영체제',              categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'computer-networks',        displayName: '컴퓨터네트워크',         categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'capstone-design-1',        displayName: '캡스톤디자인I',         categoryKey: 'major-required', enabledTabs: [] },
  { slug: 'capstone-design-2',        displayName: '캡스톤디자인II',        categoryKey: 'major-required', enabledTabs: [] },
]

export const ALL_SUBJECTS: Subject[] = COURSE_CATALOG

export function getSubject(slug: string): Subject | undefined {
  return ALL_SUBJECTS.find(s => s.slug === slug)
}

export function getSubjectsByCategory(categoryKey: CategoryKey): Subject[] {
  return ALL_SUBJECTS.filter(s => s.categoryKey === categoryKey)
}
