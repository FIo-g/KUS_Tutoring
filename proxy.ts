import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: 인증 구현 시 아래 로직 추가
// 1. 세션 토큰 확인 (NextAuth.js 권장)
// 2. 미인증 사용자를 /login 으로 리다이렉트
// 3. 이미 로그인한 사용자를 /login, /register 에서 리다이렉트
export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
