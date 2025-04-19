import { AxiosError } from 'axios';

export const handleApiError = (error: unknown, context: string): never => {
  console.error(`❗️${context} 중 오류 발생:`, error);

  if (isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 400:
        throw new Error(`${context} 실패: 잘못된 요청입니다.`);
      case 401:
        throw new Error(`${context} 실패: 인증되지 않았습니다.`);
      case 403:
        throw new Error(`${context} 실패: 권한이 없습니다.`);
      case 404:
        throw new Error(`${context} 실패: 리소스를 찾을 수 없습니다.`);
      case 500:
        throw new Error(`${context} 실패: 서버 오류입니다.`);
      default:
        throw new Error(`${context} 실패: 알 수 없는 오류가 발생했습니다.`);
    }
  }

  if (error instanceof Error) {
    throw new Error(`${context} 실패: ${error.message}`);
  }

  throw new Error(`${context} 실패: 알 수 없는 오류가 발생했습니다.`);
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true;
};
