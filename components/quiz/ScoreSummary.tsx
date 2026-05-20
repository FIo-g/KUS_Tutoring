import Button from '@/components/ui/Button'

interface ScoreSummaryProps {
  score: number
  total: number
  onRestart: () => void
}

function getMessage(score: number, total: number): string {
  const ratio = score / total
  if (ratio === 1)   return '완벽합니다! 🏆'
  if (ratio >= 0.8)  return '훌륭합니다! 🎉'
  if (ratio >= 0.6)  return '잘 했어요! 👍'
  return '더 연습이 필요해요 💪'
}

export default function ScoreSummary({ score, total, onRestart }: ScoreSummaryProps) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="flex flex-col items-center text-center py-16">
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
        최종 결과
      </p>
      <div className="text-7xl font-extrabold text-blue-600 mb-1">
        {score}
        <span className="text-4xl text-slate-300 mx-2">/</span>
        <span className="text-4xl text-slate-500">{total}</span>
      </div>
      <div className="text-2xl text-slate-400 font-medium mb-4">{pct}%</div>
      <p className="text-xl font-semibold text-slate-700 mb-12">
        {getMessage(score, total)}
      </p>
      <Button size="lg" onClick={onRestart}>
        다시 풀기
      </Button>
    </div>
  )
}
