import { WrongAnswer } from '@/lib/types'
import Button from '@/components/ui/Button'

const OPTION_LABELS = ['①', '②', '③', '④']

interface ScoreSummaryProps {
  score: number
  total: number
  wrongAnswers: WrongAnswer[]
  onRestart: () => void
  onBackToChapters: () => void
}

function getMessage(score: number, total: number): string {
  const ratio = score / total
  if (ratio === 1)  return '완벽합니다! 🏆'
  if (ratio >= 0.8) return '훌륭합니다! 🎉'
  if (ratio >= 0.6) return '잘 했어요! 👍'
  return '더 연습이 필요해요 💪'
}

export default function ScoreSummary({ score, total, wrongAnswers, onRestart, onBackToChapters }: ScoreSummaryProps) {
  const pct = Math.round((score / total) * 100)
  const allCorrect = wrongAnswers.length === 0

  return (
    <div>
      {/* 점수 요약 */}
      <div className="flex flex-col items-center text-center py-10">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          최종 결과
        </p>
        <div className="text-7xl font-extrabold text-crimson-600 mb-1">
          {score}
          <span className="text-4xl text-slate-300 mx-2">/</span>
          <span className="text-4xl text-slate-500">{total}</span>
        </div>
        <div className="text-2xl text-slate-400 font-medium mb-4">{pct}%</div>
        <p className="text-xl font-semibold text-slate-700 mb-8">
          {getMessage(score, total)}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" onClick={onRestart}>
            다시 풀기
          </Button>
          <Button size="lg" variant="secondary" onClick={onBackToChapters}>
            챕터 선택으로
          </Button>
        </div>
      </div>

      {/* 틀린 문제 해설 */}
      {!allCorrect && (
        <div className="mt-4 border-t border-slate-100 pt-8">
          <h2 className="text-base font-bold text-slate-700 mb-5 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">
              {wrongAnswers.length}
            </span>
            틀린 문제 해설
          </h2>

          <div className="flex flex-col gap-5">
            {wrongAnswers.map(({ questionNumber, question, selectedIndex }) => (
              <div
                key={question.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                {/* 문제 번호 + 질문 */}
                <p className="text-xs font-semibold text-slate-400 mb-1">
                  Q{questionNumber}
                  {question.chapter !== undefined && (
                    <span className="ml-2">· Chapter {question.chapter}</span>
                  )}
                </p>
                <p className="font-semibold text-slate-800 mb-4">
                  {question.question}
                </p>

                {/* 내 답 vs 정답 */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-red-300 bg-red-50">
                    <span className="text-red-500 font-bold shrink-0">✗ 내 답</span>
                    <span className="text-red-700 font-bold shrink-0">
                      {OPTION_LABELS[selectedIndex]}
                    </span>
                    <span className="text-red-700">
                      {question.options[selectedIndex]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-green-300 bg-green-50">
                    <span className="text-green-600 font-bold shrink-0">✓ 정 답</span>
                    <span className="text-green-700 font-bold shrink-0">
                      {OPTION_LABELS[question.correctIndex]}
                    </span>
                    <span className="text-green-700">
                      {question.options[question.correctIndex]}
                    </span>
                  </div>
                </div>

                {/* 해설 */}
                {question.explanation && (
                  <div className="bg-white rounded-lg border border-slate-200 px-4 py-3">
                    <p className="text-xs font-semibold text-slate-400 mb-1">해설</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
