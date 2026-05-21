import { ExpectedQuestion } from '@/lib/types'

// TODO: auth 연동 후 각 문제에 user-specific "복습 완료" 상태 필드 추가

export const predictedQuestions: ExpectedQuestion[] = [
  {
    id: 'cl1-pred-q1',
    question: '다음 코드에서 포인터 p를 이용해 배열의 세 번째 원소 값을 출력하는 올바른 표현식은?',
    codeBlock: `int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;`,
    options: [
      '*(p + 2)',
      '*(p + 3)',
      'p[2]와 *(p+2) 모두 가능',
      '*p + 2',
    ],
    answer: '③',
    chapter: 8,
    tags: ['포인터', '배열', '역참조'],
    explanation: 'p[2]와 *(p+2)는 완전히 동일한 표현입니다. 인덱스 표기법과 포인터 산술은 상호 교환 가능합니다. 세 번째 원소는 인덱스 2(arr[2] = 30)입니다.',
  },
  {
    id: 'cl1-pred-q2',
    question: '다음 코드의 출력 결과는?',
    codeBlock: `#include <stdio.h>
#include <string.h>
int main(void)
{
    char s2[20] = "C\\0lang";
    printf("%d\\n", (int)strlen(s2));
    return 0;
}`,
    options: [
      '6',
      '1',
      '7',
      '2',
    ],
    answer: '②',
    chapter: 9,
    tags: ['문자열', 'strlen', '널문자'],
    explanation: '"C\\0lang"에서 \\0은 널 문자입니다. strlen은 첫 번째 \\0 이전의 문자 수를 반환하므로 \'C\' 하나만 세어 1을 반환합니다.',
  },
  {
    id: 'cl1-pred-q3',
    question: '크기가 10인 int 배열 전체를 0으로 초기화하는 가장 간단한 방법은?',
    options: [
      'int arr[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};',
      'int arr[10] = {0};',
      'int arr[10]; memset(arr, 0, 10);',
      'int arr[10] = {};',
    ],
    answer: '②',
    chapter: 7,
    tags: ['배열', '초기화'],
    explanation: 'int arr[10] = {0}; 은 첫 번째 원소를 0으로 초기화하고 나머지도 모두 자동으로 0이 됩니다. 가장 간결하고 권장되는 방법입니다.',
  },
  {
    id: 'cl1-pred-q4',
    question: '다음 swap 함수가 두 변수의 값을 교환하지 못하는 이유를 고르시오.',
    codeBlock: `void swap(int a, int b)
{
    int tmp = a;
    a = b;
    b = tmp;
}`,
    options: [
      'tmp 변수를 사용했기 때문이다.',
      '함수가 값의 복사본을 받으므로 원본 변수에 영향을 주지 못한다.',
      'int 형은 swap이 불가능하다.',
      'return 문이 없기 때문이다.',
    ],
    answer: '②',
    chapter: 8,
    tags: ['포인터', '함수', 'Call by Value'],
    explanation: '이 함수는 Call by Value 방식으로 a, b는 원본의 복사본입니다. 원본을 수정하려면 포인터를 사용해야 합니다: void swap(int *a, int *b)',
  },
  {
    id: 'cl1-pred-q5',
    question: '다음 코드에서 "Hello World"를 올바르게 출력하도록 빈칸을 채우시오.',
    codeBlock: `#include <stdio.h>
#include <string.h>
int main(void)
{
    char s1[20] = "Hello";
    char s2[] = " World";
    ________(s1, s2);
    printf("%s\\n", s1);
    return 0;
}`,
    answer: 'strcat',
    chapter: 9,
    tags: ['문자열', 'strcat'],
    explanation: 'strcat(s1, s2)는 s1의 끝(널 문자 위치)에 s2를 이어 붙입니다. s1의 크기가 결합된 문자열을 담기에 충분해야 합니다.',
  },
  {
    id: 'cl1-pred-q6',
    question: '배열 arr의 모든 원소의 합을 구하는 코드에서 빈칸을 완성하시오.',
    codeBlock: `int arr[5] = {3, 1, 4, 1, 5};
int i, sum = 0;
for (i = 0; ________; i++)
    sum += arr[i];`,
    answer: 'i < 5',
    chapter: 7,
    tags: ['배열', '반복문'],
    explanation: '배열 크기가 5이므로 인덱스는 0~4입니다. 조건은 i < 5 (또는 i <= 4)이어야 범위를 벗어나지 않고 모든 원소를 순회합니다.',
  },
  {
    id: 'cl1-pred-q7',
    question: '다음 중 strcmp(s1, s2)의 반환값 해석으로 옳은 것은?',
    options: [
      '반환값이 0이면 두 문자열의 주소가 같다.',
      '반환값이 양수이면 s1이 사전순으로 s2보다 앞이다.',
      '반환값이 0이면 두 문자열의 내용이 같다.',
      '반환값이 음수이면 s1의 길이가 s2보다 짧다.',
    ],
    answer: '③',
    chapter: 9,
    tags: ['문자열', 'strcmp', '비교'],
    explanation: 'strcmp는 사전순(알파벳 순) 비교입니다. 0이면 내용 동일, 양수이면 s1 > s2, 음수이면 s1 < s2. 주소나 길이와는 무관합니다.',
  },
  {
    id: 'cl1-pred-q8',
    question: '다음 코드의 출력 결과를 쓰시오.',
    codeBlock: `#include <stdio.h>
int main(void)
{
    int arr[4] = {2, 4, 6, 8};
    int *p = arr;
    p++;
    printf("%d\\n", *p);
    printf("%d\\n", *(p + 1));
    return 0;
}`,
    options: [
      '2\n4',
      '4\n6',
      '4\n8',
      '6\n8',
    ],
    answer: '②',
    chapter: 8,
    tags: ['포인터', '포인터 산술'],
    explanation: 'p는 처음에 arr[0](=2)을 가리킵니다. p++로 p는 arr[1](=4)을 가리키게 됩니다. *p = 4, *(p+1) = arr[2] = 6 이므로 "4\\n6"이 출력됩니다.',
  },
]
