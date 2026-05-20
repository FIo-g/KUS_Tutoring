import { QuizQuestion } from '@/lib/types'

// ──────────────────────────────────────────
// Chapter 1–6  (기초 문법)
// ──────────────────────────────────────────
const chapter1to6: QuizQuestion[] = [
  {
    id: 'cl1-c2-q1',
    chapter: 2,
    question: 'C 언어에서 정수형 변수를 선언하는 올바른 방법은?',
    options: ['integer x;', 'int x;', 'Int x;', 'var x: int;'],
    correctIndex: 1,
    explanation: 'C 언어에서 정수형 변수는 int 키워드로 선언합니다. integer, Int, var 는 C 문법에 존재하지 않습니다.',
  },
  {
    id: 'cl1-c3-q1',
    chapter: 3,
    question: 'C 언어에서 표준 출력에 사용하는 함수는?',
    options: ['print()', 'echo()', 'printf()', 'System.out.println()'],
    correctIndex: 2,
    explanation: 'printf() 는 C 언어의 표준 출력 함수로, <stdio.h> 헤더에 정의되어 있습니다.',
  },
  {
    id: 'cl1-c5-q1',
    chapter: 5,
    question: '다음 중 C 언어의 기본 반복문이 아닌 것은?',
    options: ['for', 'while', 'foreach', 'do-while'],
    correctIndex: 2,
    explanation: 'foreach 는 C 언어에 존재하지 않습니다. C 언어는 for, while, do-while 세 가지 반복문을 제공합니다.',
  },
  {
    id: 'cl1-c6-q1',
    chapter: 6,
    question: 'C 언어에서 포인터 변수를 선언할 때 사용하는 기호는?',
    options: ['&', '*', '#', '@'],
    correctIndex: 1,
    explanation: '* 를 사용하여 포인터 변수를 선언합니다. 예: int *ptr; / & 는 변수의 주소를 얻는 연산자입니다.',
  },
  {
    id: 'cl1-c4-q1',
    chapter: 4,
    question: '다음 C 코드의 출력 결과는?  printf("%d", 3 + 4 * 2);',
    options: ['14', '11', '10', '8'],
    correctIndex: 1,
    explanation: '연산자 우선순위에 따라 4 * 2 = 8 이 먼저 계산되고, 3 + 8 = 11 이 출력됩니다.',
  },
]

// ──────────────────────────────────────────
// Chapter 7  (추가 예정 — 문제 데이터 전달 시 여기에 작성)
// ──────────────────────────────────────────
const chapter7: QuizQuestion[] = []

// ──────────────────────────────────────────
// Chapter 8  (추가 예정)
// ──────────────────────────────────────────
const chapter8: QuizQuestion[] = []

// ──────────────────────────────────────────
// Chapter 9  (추가 예정)
// ──────────────────────────────────────────
const chapter9: QuizQuestion[] = []

export const questions: QuizQuestion[] = [
  ...chapter1to6,
  ...chapter7,
  ...chapter8,
  ...chapter9,
]
