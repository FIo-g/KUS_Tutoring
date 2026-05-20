import { Subject } from '@/lib/types'

interface TopNavProps {
  subject: Subject
}

export default function TopNav({ subject }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold text-lg tracking-tight">KUS</span>
          <span className="text-slate-200">|</span>
          <span className="text-slate-800 font-semibold">{subject.displayName}</span>
        </div>
        {/* TODO: 인증 구현 시 사용자 아바타 / 로그아웃 버튼으로 교체 */}
        <div className="w-8 h-8 rounded-full bg-slate-100" />
      </div>
    </header>
  )
}
