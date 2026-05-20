import { redirect } from 'next/navigation'

// 과목 선택 페이지 추가 시 이 리다이렉트를 /subjects 로 변경
export default function Home() {
  redirect('/subjects/computer-language-1/quiz')
}
