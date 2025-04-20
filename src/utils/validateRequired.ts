export const validateRequired = (value: string, fieldName: string): void => {
  if (!value.trim()) throw new Error(`${fieldName}을(를) 입력해주세요.`);
};
