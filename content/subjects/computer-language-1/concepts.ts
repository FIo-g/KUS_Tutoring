import { ConceptChapter } from '@/lib/types'

export const concepts: ConceptChapter[] = [
  // ──────────────────────────────────────────
  // Chapter 7 — 배열 (Array)
  // ──────────────────────────────────────────
  {
    id: 'cl1-concept-ch7',
    chapterNumber: 7,
    title: 'Chapter 7 · 배열 (Array)',
    sections: [
      {
        heading: '배열이란?',
        body: `배열은 **같은 데이터 타입**의 여러 값을 연속적인 메모리 공간에 저장하는 자료 구조입니다.

선언 형식: \`자료형 배열명[크기];\`

\`\`\`c
int scores[5];      /* 정수형 배열, 크기 5 */
double prices[10];  /* 실수형 배열, 크기 10 */
\`\`\`

배열의 각 원소는 **인덱스**로 접근하며, 인덱스는 항상 **0부터** 시작합니다.`,
      },
      {
        heading: '배열 초기화',
        body: `선언과 동시에 중괄호로 초기화할 수 있습니다.

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};  /* 전체 초기화 */
int arr[] = {1, 2, 3};              /* 크기 자동 결정 → 3 */
int arr[5] = {0};                   /* 모든 요소 0으로 초기화 */
int arr[5] = {1, 2};                /* 나머지 3개는 자동으로 0 */
\`\`\`

> **핵심**: 부분 초기화 시 나머지 요소는 자동으로 **0**으로 채워집니다.`,
      },
      {
        heading: '인덱스와 메모리 구조',
        body: `배열의 마지막 인덱스는 **크기 - 1**입니다. 범위를 벗어나면 정의되지 않은 동작(Undefined Behavior)이 발생합니다.

\`\`\`c
int arr[5] = {10, 20, 30, 40, 50};
/*  인덱스:  [0]  [1]  [2]  [3]  [4] */

printf("%d\\n", arr[0]);  /* 10 */
printf("%d\\n", arr[4]);  /* 50 */
/* arr[5] → 범위 초과! 절대 사용 금지 */
\`\`\`

배열 원소들은 메모리에 **연속적**으로 배치되며, 배열 이름(\`arr\`)은 첫 번째 원소의 주소입니다.`,
      },
      {
        heading: '배열 순회 (반복문)',
        body: `\`\`\`c
#include <stdio.h>
int main(void)
{
    int arr[5] = {10, 20, 30, 40, 50};
    int i, sum = 0;

    for (i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("합계: %d\\n", sum);   /* 150 */
    return 0;
}
\`\`\`

배열의 크기를 매직 넘버 대신 \`sizeof\`로 구하면 유지보수가 쉬워집니다.

\`\`\`c
int len = sizeof(arr) / sizeof(arr[0]);  /* 5 */
\`\`\``,
      },
      {
        heading: '배열과 함수',
        body: `배열을 함수에 전달할 때는 **주소(포인터)**가 전달되므로, 함수 내에서 원소를 수정하면 원본이 바뀝니다.

\`\`\`c
void doubleAll(int arr[], int size)
{
    int i;
    for (i = 0; i < size; i++)
        arr[i] *= 2;
}

int main(void)
{
    int nums[3] = {1, 2, 3};
    doubleAll(nums, 3);
    /* nums = {2, 4, 6} */
    return 0;
}
\`\`\``,
      },
    ],
  },

  // ──────────────────────────────────────────
  // Chapter 8 — 포인터 (Pointer)
  // ──────────────────────────────────────────
  {
    id: 'cl1-concept-ch8',
    chapterNumber: 8,
    title: 'Chapter 8 · 포인터 (Pointer)',
    sections: [
      {
        heading: '포인터란?',
        body: `포인터는 **다른 변수의 메모리 주소**를 저장하는 변수입니다.

| 연산자 | 이름 | 역할 |
|--------|------|------|
| \`&\` | 주소 연산자 | 변수의 메모리 주소를 반환 |
| \`*\` | 역참조 연산자 | 포인터가 가리키는 값에 접근 |

\`\`\`c
int x = 42;
int *ptr = &x;   /* ptr에 x의 주소 저장 */
\`\`\``,
      },
      {
        heading: '포인터 선언과 기본 사용',
        body: `\`\`\`c
#include <stdio.h>
int main(void)
{
    int x = 42;
    int *ptr;       /* 포인터 변수 선언 */
    ptr = &x;       /* x의 주소를 ptr에 저장 */

    printf("%d\\n", x);     /* 42  — 변수의 값 */
    printf("%p\\n", ptr);   /* 주소 출력 (예: 0x7fff...) */
    printf("%d\\n", *ptr);  /* 42  — 역참조: 포인터가 가리키는 값 */

    *ptr = 100;     /* 역참조로 x의 값 변경 */
    printf("%d\\n", x);     /* 100 */
    return 0;
}
\`\`\``,
      },
      {
        heading: 'NULL 포인터와 초기화',
        body: `포인터를 선언하자마자 \`NULL\`로 초기화하는 것이 안전합니다.

\`\`\`c
int *ptr = NULL;   /* 아무것도 가리키지 않음 */

if (ptr != NULL) {
    printf("%d\\n", *ptr);   /* NULL이 아닐 때만 역참조 */
}
\`\`\`

> **주의**: 초기화되지 않은 포인터를 역참조하면 **세그멘테이션 오류(Segfault)**가 발생합니다.`,
      },
      {
        heading: '포인터와 배열',
        body: `배열 이름은 배열의 **첫 번째 원소 주소**와 동일하게 동작합니다.

\`\`\`c
int arr[3] = {10, 20, 30};
int *ptr = arr;   /* &arr[0]과 동일 */

printf("%d\\n", *ptr);        /* 10 = arr[0] */
printf("%d\\n", *(ptr + 1));  /* 20 = arr[1] */
printf("%d\\n", *(ptr + 2));  /* 30 = arr[2] */
\`\`\`

포인터 산술: \`ptr + 1\`은 **다음 원소의 주소** (자료형 크기만큼 이동합니다).`,
      },
      {
        heading: '포인터와 함수 (Call by Reference)',
        body: `포인터를 함수 인자로 넘기면 **원본 변수를 직접 수정**할 수 있습니다.

\`\`\`c
void swap(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void)
{
    int x = 3, y = 7;
    swap(&x, &y);
    printf("%d %d\\n", x, y);   /* 7 3 */
    return 0;
}
\`\`\``,
      },
    ],
  },

  // ──────────────────────────────────────────
  // Chapter 9 — 문자열 (String)
  // ──────────────────────────────────────────
  {
    id: 'cl1-concept-ch9',
    chapterNumber: 9,
    title: 'Chapter 9 · 문자열 (String)',
    sections: [
      {
        heading: '문자열이란?',
        body: `C 언어에서 문자열은 **char형 배열**로 표현하며, 끝에 **널 문자(\`\\0\`)**가 자동으로 추가됩니다.

\`\`\`c
char str1[] = "Hello";    /* {'H','e','l','l','o','\\0'} — 크기 6 */
char str2[10] = "World";  /* 배열 크기 ≥ 문자 수 + 1 */
\`\`\`

| 함수 | 결과 | 설명 |
|------|------|------|
| \`strlen("Hello")\` | 5 | 널 문자 **제외** |
| \`sizeof(str2)\` | 10 | 배열 **선언 크기** |`,
      },
      {
        heading: '문자열 입출력',
        body: `\`\`\`c
char name[50];

scanf("%s", name);                  /* 공백 이전까지만 읽음 */
fgets(name, sizeof(name), stdin);   /* 공백 포함 한 줄 전체 읽음 */

printf("%s\\n", name);
\`\`\`

> **핵심**: \`scanf("%s")\`는 공백을 만나면 입력을 중단합니다.
> 공백이 포함된 문자열은 반드시 **\`fgets()\`**를 사용하세요.`,
      },
      {
        heading: '주요 문자열 함수 (<string.h>)',
        body: `| 함수 | 기능 | 예시 결과 |
|------|------|-----------|
| \`strlen(s)\` | 길이 반환 (\\0 제외) | \`strlen("hello")\` → 5 |
| \`strcpy(dst, src)\` | src를 dst에 복사 | dst = "hello" |
| \`strcat(dst, src)\` | dst 끝에 src 이어 붙임 | \`"Hello" + " World"\` → \`"Hello World"\` |
| \`strcmp(s1, s2)\` | 사전순 비교 | 같으면 0, s1<s2면 음수, s1>s2면 양수 |

\`\`\`c
char s1[20] = "Hello";
char s2[] = " World";
strcat(s1, s2);
printf("%s\\n", s1);           /* Hello World */
printf("%d\\n", strlen(s1));   /* 11 */
\`\`\``,
      },
      {
        heading: '문자열 비교 주의사항',
        body: `\`==\` 연산자는 **주소**를 비교하므로 문자열 내용 비교에 사용할 수 없습니다.

\`\`\`c
char s1[] = "hello";
char s2[] = "hello";

/* ❌ 잘못된 방법 */
if (s1 == s2)              /* 항상 false — 주소가 다름 */

/* ✅ 올바른 방법 */
if (strcmp(s1, s2) == 0)   /* 내용이 같으면 true */
\`\`\`

마찬가지로, 선언 이후에 배열에 문자열을 대입할 때도 \`=\`가 아닌 \`strcpy()\`를 사용해야 합니다.

\`\`\`c
char name[20];
/* ❌ */ name = "Alice";          /* 컴파일 에러 */
/* ✅ */ strcpy(name, "Alice");   /* 올바른 방법 */
\`\`\``,
      },
    ],
  },
]
