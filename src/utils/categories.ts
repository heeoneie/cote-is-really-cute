// 카테고리 수준을 나타내는 타입
export type DifficultyLevels = '초급' | '중급' | '고급';

// CATEGORIES 객체 정의
export const CATEGORIES = {
  초급: ['문자열', '배열', '정렬', '해시'],
  중급: ['브루트포스', '스택 및 큐', '탐욕법'],
  고급: ['동적계획법', '깊이 및 너비 우선 탐색', '이분탐색', '그래프'],
} as const; // as const 추가하여 값을 리터럴 타입으로 고정

// CATEGORIES 타입을 명시적으로 지정
export type Categories = typeof CATEGORIES;

// DifficultyLevels에 대응되는 알고리즘을 가져오기 위한 타입 정의
export type AlgorithmList = Categories[DifficultyLevels]; // 각 난이도별 알고리즘 목록의 타입
