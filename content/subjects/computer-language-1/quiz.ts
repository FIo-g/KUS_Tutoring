import { QuizQuestion } from '@/lib/types'

// 새 문제 추가 시 이 배열에 객체를 추가하면 됩니다.
export const questions: QuizQuestion[] = [
  {
    id: 'cl1-q1',
    question: 'C 언어에서 정수형 변수를 선언하는 올바른 방법은?',
    options: ['integer x;', 'int x;', 'Int x;', 'var x: int;'],
    correctIndex: 1,
    explanation: 'C 언어에서 정수형 변수는 int 키워드로 선언합니다. integer, Int, var 는 C 문법에 존재하지 않습니다.',
  },
  {
    id: 'cl1-q2',
    question: 'C 언어에서 표준 출력에 사용하는 함수는?',
    options: ['print()', 'echo()', 'printf()', 'System.out.println()'],
    correctIndex: 2,
    explanation: 'printf() 는 C 언어의 표준 출력 함수로, <stdio.h> 헤더에 정의되어 있습니다.',
  },
  {
    id: 'cl1-q3',
    question: '다음 중 C 언어의 기본 반복문이 아닌 것은?',
    options: ['for', 'while', 'foreach', 'do-while'],
    correctIndex: 2,
    explanation: 'foreach 는 C 언어에 존재하지 않습니다. C 언어는 for, while, do-while 세 가지 반복문을 제공합니다.',
  },
  {
    id: 'cl1-q4',
    question: 'C 언어에서 포인터 변수를 선언할 때 사용하는 기호는?',
    options: ['&', '*', '#', '@'],
    correctIndex: 1,
    explanation: '* 를 사용하여 포인터 변수를 선언합니다. 예: int *ptr; / & 는 변수의 주소를 얻는 연산자입니다.',
  },
  {
    id: 'cl1-q5',
    question: '다음 C 코드의 출력 결과는? printf("%d", 3 + 4 * 2);',
    options: ['14', '11', '10', '8'],
    correctIndex: 1,
    explanation: '연산자 우선순위에 따라 4 * 2 = 8이 먼저 계산되고, 3 + 8 = 11 이 출력됩니다.',
  },
]
