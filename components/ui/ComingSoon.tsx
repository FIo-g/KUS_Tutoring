interface ComingSoonProps {
  tabName: string
}

export default function ComingSoon({ tabName }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center select-none">
      <div className="mb-5 text-6xl">🚧</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{tabName}</h2>
      <p className="text-slate-500 text-lg">준비 중입니다</p>
      <p className="text-slate-400 text-sm mt-1">곧 업데이트될 예정이에요</p>
    </div>
  )
}
