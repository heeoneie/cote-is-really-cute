import request from './axios';

interface RecommendProblemsRequest {
  category: string;
}

interface RecommendProblemsResponse {
  problems: string[];
}

interface GradeCodeRequest {
  problemTitle: string;
  userLanguage: string;
  userCode: string;
}

interface GradeCodeResponse {
  isCorrect: boolean;
}

export const recommendProblems = async (
  category: string,
): Promise<string[]> => {
  if (!category.trim()) {
    throw new Error('유효한 카테고리를 입력해주세요.');
  }

  try {
    const response = await request.post<RecommendProblemsResponse>(
      '/openai/recommendation',
      { category },
    );
    return response?.data?.problems ?? [];
  } catch (error) {
    console.error('📌 문제 추천 API 호출 중 오류 발생:', error);
    throw error;
  }
};

export const gradeCode = async (data: GradeCodeRequest): Promise<boolean> => {
  const { problemTitle, userLanguage, userCode } = data;

  if (!problemTitle || !userLanguage || !userCode) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  try {
    const response = await request.post<GradeCodeResponse>('/openai/grade', {
      data,
    });
    return response?.data?.isCorrect ?? false; // 응답이 없으면 기본값 false
  } catch (error) {
    console.error('📌 코드 채점 API 호출 중 오류 발생:', error);
    throw error;
  }
};
