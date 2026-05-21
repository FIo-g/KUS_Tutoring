'use client'

import { useState } from 'react'
import { ConceptChapter } from '@/lib/types'

interface ConceptsViewerProps {
  chapters: ConceptChapter[]
}

export default function ConceptsViewer({ chapters }: ConceptsViewerProps) {
  const [openId, setOpenId] = useState<string | null>(chapters[0]?.id ?? null)

  return (
    <div className="flex flex-col gap-3">
      {chapters.map(chapter => {
        const isOpen = openId === chapter.id
        return (
          <div
            key={chapter.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            {/* 챕터 헤더 */}
            <button
              onClick={() => setOpenId(isOpen ? null : chapter.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Chapter {chapter.chapterNumber}
                </span>
                <h2 className="text-base font-bold text-slate-800 mt-0.5">
                  {chapter.title.replace(/^Chapter \d+ · /, '')}
                </h2>
              </div>
              <span className={`text-slate-400 text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {/* 섹션 목록 */}
            {isOpen && (
              <div className="border-t border-slate-100 divide-y divide-slate-100">
                {chapter.sections.map((section, i) => (
                  <ConceptSection
                    key={i}
                    heading={section.heading}
                    body={section.body}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ConceptSection({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="px-6 py-5">
      <h3 className="text-sm font-bold text-slate-700 mb-3">{heading}</h3>
      <MarkdownBody text={body} />
    </div>
  )
}

// 간단한 인라인 마크다운 렌더러 (외부 라이브러리 없이)
// 지원: 코드블록(```), 인라인코드(`), **볼드**, 테이블, > 인용, 줄바꿈
function MarkdownBody({ text }: { text: string }) {
  const blocks = parseBlocks(text)
  return (
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">
      {blocks.map((block, i) => {
        if (block.type === 'code') {
          return (
            <pre
              key={i}
              className="bg-slate-900 text-slate-100 rounded-xl px-5 py-4 text-xs font-mono leading-relaxed overflow-x-auto border border-slate-700"
            >
              {block.content}
            </pre>
          )
        }
        if (block.type === 'blockquote') {
          return (
            <div key={i} className="border-l-4 border-crimson-300 pl-4 py-0.5 bg-crimson-50 rounded-r-lg">
              <p className="text-crimson-800 text-sm">{renderInline(block.content)}</p>
            </div>
          )
        }
        if (block.type === 'table') {
          return <MarkdownTable key={i} raw={block.content} />
        }
        return <p key={i}>{renderInline(block.content)}</p>
      })}
    </div>
  )
}

type Block =
  | { type: 'code';       content: string }
  | { type: 'blockquote'; content: string }
  | { type: 'table';      content: string }
  | { type: 'paragraph';  content: string }

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = []
  const lines = text.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 코드블록
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push({ type: 'code', content: codeLines.join('\n') })
      i++
      continue
    }

    // 인용
    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2))
        i++
      }
      blocks.push({ type: 'blockquote', content: quoteLines.join(' ') })
      continue
    }

    // 테이블
    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      blocks.push({ type: 'table', content: tableLines.join('\n') })
      continue
    }

    // 빈 줄 건너뜀
    if (line.trim() === '') {
      i++
      continue
    }

    // 일반 문단
    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('```') && !lines[i].startsWith('> ') && !lines[i].startsWith('|')) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', content: paraLines.join(' ') })
    }
  }

  return blocks
}

function renderInline(text: string): React.ReactNode {
  // **볼드**, `인라인코드` 처리
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>
    }
    return part
  })
}

function MarkdownTable({ raw }: { raw: string }) {
  const rows = raw.split('\n').filter(r => r.startsWith('|'))
  if (rows.length < 2) return null

  const header = rows[0].split('|').filter(Boolean).map(c => c.trim())
  // rows[1] is separator (---|---|...)
  const body = rows.slice(2).map(row => row.split('|').filter(Boolean).map(c => c.trim()))

  return (
    <div className="overflow-x-auto">
      <table className="text-xs w-full border-collapse">
        <thead>
          <tr className="bg-slate-100">
            {header.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-slate-700 border border-slate-200">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="even:bg-slate-50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-slate-600 border border-slate-200">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
