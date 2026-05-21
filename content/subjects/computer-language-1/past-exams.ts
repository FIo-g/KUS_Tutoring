import { PastExam } from '@/lib/types'

export const pastExams: PastExam[] = [
  {
    id: 'cl1-exam-2024-1-mid',
    year: 2024,
    semester: '1',
    type: 'midterm',
    title: '2024년 1학기 중간고사',
    questions: [
      {
        id: 'cl1-exam-2024-1-mid-q1',
        number: 1,
        question: '다음 중 C 언어 배열에 대한 설명으로 옳지 않은 것은?',
        options: [
          '배열의 인덱스는 0부터 시작한다.',
          '배열은 서로 다른 데이터형의 원소를 함께 저장할 수 있다.',
          '배열의 각 원소는 메모리에 연속적으로 할당된다.',
          '배열 이름은 첫 번째 원소의 주소를 나타낸다.',
        ],
        answer: '②',
        points: 5,
        explanation: 'C 언어의 배열은 반드시 동일한 자료형의 원소만 저장할 수 있습니다. 서로 다른 자료형을 함께 저장하려면 구조체(struct)를 사용해야 합니다.',
        chapter: 7,
      },
      {
        id: 'cl1-exam-2024-1-mid-q2',
        number: 2,
        question: '다음 코드에서 arr의 크기와 arr[1]의 값은?',
        codeBlock: `int arr[] = {5, 10, 15, 20};`,
        options: [
          '크기: 3, 값: 5',
          '크기: 4, 값: 10',
          '크기: 4, 값: 15',
          '크기: 5, 값: 10',
        ],
        answer: '②',
        points: 5,
        explanation: '초기화 목록 {5,10,15,20}으로 배열 크기가 자동으로 4로 결정됩니다. arr[1]은 인덱스 1, 즉 두 번째 원소이므로 10입니다.',
        chapter: 7,
      },
      {
        id: 'cl1-exam-2024-1-mid-q3',
        number: 3,
        question: '다음 코드의 출력 결과를 쓰시오.',
        codeBlock: `#include <stdio.h>
int main(void)
{
    int arr[5] = {1, 2, 3};
    int i;
    for (i = 0; i < 5; i++)
        printf("%d ", arr[i]);
    return 0;
}`,
        answer: '1 2 3 0 0',
        points: 10,
        explanation: '배열을 부분 초기화하면 나머지 원소는 자동으로 0으로 초기화됩니다. arr[0]=1, arr[1]=2, arr[2]=3, arr[3]=0, arr[4]=0이므로 "1 2 3 0 0"이 출력됩니다.',
        chapter: 7,
      },
      {
        id: 'cl1-exam-2024-1-mid-q4',
        number: 4,
        question: '다음 중 포인터 변수의 선언으로 올바른 것은?',
        options: [
          'int ptr;',
          'int &ptr;',
          'int *ptr;',
          'pointer int ptr;',
        ],
        answer: '③',
        points: 5,
        explanation: 'C 언어에서 포인터 변수는 자료형 뒤에 *를 붙여 선언합니다. int *ptr; 은 int형 변수를 가리키는 포인터입니다.',
        chapter: 8,
      },
      {
        id: 'cl1-exam-2024-1-mid-q5',
        number: 5,
        question: '다음 코드에서 출력 결과를 순서대로 쓰시오.',
        codeBlock: `#include <stdio.h>
int main(void)
{
    int x = 10;
    int *ptr = &x;
    *ptr = 20;
    printf("%d\\n", x);
    printf("%d\\n", *ptr);
    return 0;
}`,
        answer: '20\n20',
        points: 10,
        explanation: '*ptr = 20은 ptr이 가리키는 변수(x)의 값을 20으로 변경합니다. x와 *ptr은 같은 메모리를 가리키므로 둘 다 20이 출력됩니다.',
        chapter: 8,
      },
      {
        id: 'cl1-exam-2024-1-mid-q6',
        number: 6,
        question: '다음 중 포인터 연산에 대한 설명으로 옳지 않은 것은?',
        options: [
          'int *p에서 p+1은 p의 주소에서 sizeof(int)바이트만큼 증가한 주소이다.',
          '포인터끼리 덧셈 연산이 가능하다.',
          '포인터끼리 뺄셈 연산으로 두 원소 사이의 거리를 구할 수 있다.',
          '*p와 p[0]은 동일한 의미이다.',
        ],
        answer: '②',
        points: 5,
        explanation: '포인터끼리의 덧셈은 정의되지 않은 연산입니다. 포인터에 정수를 더하거나(ptr+n), 같은 배열을 가리키는 포인터끼리 뺄셈(ptr1-ptr2)은 가능하지만, 포인터와 포인터의 덧셈은 허용되지 않습니다.',
        chapter: 8,
      },
      {
        id: 'cl1-exam-2024-1-mid-q7',
        number: 7,
        question: '다음 코드에서 strlen(s1)과 sizeof(s1)의 값을 각각 쓰시오.',
        codeBlock: `char s1[20] = "Hello";`,
        answer: 'strlen(s1) = 5, sizeof(s1) = 20',
        points: 10,
        explanation: 'strlen은 널 문자를 제외한 실제 문자 수(5)를 반환하고, sizeof는 배열의 선언된 전체 크기(20 바이트)를 반환합니다.',
        chapter: 9,
      },
      {
        id: 'cl1-exam-2024-1-mid-q8',
        number: 8,
        question: '빈칸을 포함한 문자열 한 줄을 입력받는 올바른 방법은?',
        options: [
          'scanf("%s", str);',
          'scanf("%c", str);',
          'fgets(str, sizeof(str), stdin);',
          'printf("%s", str);',
        ],
        answer: '③',
        points: 5,
        explanation: 'scanf("%s")는 공백에서 입력이 중단됩니다. 공백을 포함한 한 줄 전체를 읽으려면 fgets()를 사용해야 합니다.',
        chapter: 9,
      },
      {
        id: 'cl1-exam-2024-1-mid-q9',
        number: 9,
        question: '다음 코드의 출력 결과를 쓰시오.',
        codeBlock: `#include <stdio.h>
#include <string.h>
int main(void)
{
    char s1[30] = "Good";
    char s2[] = " Morning";
    strcat(s1, s2);
    printf("%s\\n", s1);
    printf("%d\\n", (int)strlen(s1));
    return 0;
}`,
        answer: 'Good Morning\n12',
        points: 10,
        explanation: 'strcat은 s1 끝에 s2를 이어 붙입니다. "Good" + " Morning" = "Good Morning" (12글자).',
        chapter: 9,
      },
      {
        id: 'cl1-exam-2024-1-mid-q10',
        number: 10,
        question: '다음 코드에서 오류를 찾아 수정하시오.',
        codeBlock: `#include <stdio.h>
int main(void)
{
    char name[20];
    name = "Alice";
    if (name == "Alice")
        printf("Hello, Alice!\\n");
    return 0;
}`,
        answer: '오류 1: name = "Alice" → strcpy(name, "Alice")\n오류 2: name == "Alice" → strcmp(name, "Alice") == 0',
        points: 10,
        explanation: '배열 이름은 포인터 상수이므로 = 연산자로 문자열을 직접 대입할 수 없습니다(strcpy 사용). 문자열 내용 비교에는 == 대신 strcmp()를 사용해야 합니다.',
        chapter: 9,
      },
    ],
  },
  {
    id: 'cl1-exam-2024-1-final',
    year: 2024,
    semester: '1',
    type: 'final',
    title: '2024년 1학기 기말고사',
    questions: [
      {
        id: 'cl1-exam-2024-1-final-q1',
        number: 1,
        question: '다음 코드에서 swap 함수 호출 후 x, y의 값을 각각 쓰시오.',
        codeBlock: `#include <stdio.h>
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
    printf("%d %d\\n", x, y);
    return 0;
}`,
        answer: '7 3',
        points: 10,
        explanation: 'swap 함수는 포인터를 이용해 두 변수의 값을 교환합니다. 함수 내부에서 *a와 *b를 통해 원본 변수 x, y를 직접 수정하므로 호출 후 x=7, y=3이 됩니다.',
        chapter: 8,
      },
      {
        id: 'cl1-exam-2024-1-final-q2',
        number: 2,
        question: '다음 코드의 출력 결과를 쓰시오.',
        codeBlock: `#include <stdio.h>
#include <string.h>
int main(void)
{
    char str[] = "Programming";
    int i;
    for (i = 0; i < (int)strlen(str); i++) {
        if (str[i] == 'g')
            str[i] = 'G';
    }
    printf("%s\\n", str);
    return 0;
}`,
        answer: 'ProGramminG',
        points: 10,
        explanation: '"Programming"에서 소문자 g는 인덱스 3과 10에 위치합니다. 두 위치의 g를 G로 교체하면 "ProGramminG"가 됩니다.',
        chapter: 9,
      },
      {
        id: 'cl1-exam-2024-1-final-q3',
        number: 3,
        question: '포인터와 배열의 관계를 설명하고, arr과 &arr[0]의 차이점을 서술하시오.',
        answer: '배열 이름 arr은 배열 첫 번째 원소의 주소를 가리키는 포인터 상수이다. arr과 &arr[0]은 같은 주소값을 가지지만, arr은 배열 전체를 가리키는 포인터 상수이고 &arr[0]은 첫 번째 원소를 가리키는 포인터라는 점에서 타입상 차이가 있다. 실용적으로는 둘 다 동일하게 사용된다.',
        points: 15,
        explanation: '배열 이름은 포인터 상수이므로 증가/감소 연산이 불가합니다(arr++는 오류). 반면 일반 포인터 변수(int *p = arr;)는 산술 연산이 가능합니다.',
        chapter: 8,
      },
    ],
  },
]
