import * as yup from 'yup';

export const joinSchema = yup.object({
  nickName: yup
    .string()
    .required('닉네임은 필수입니다.')
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(12, '닉네임은 최대 12자 이하이어야 합니다.'),

  email: yup
    .string()
    .required('이메일은 필수입니다.')
    .email('이메일 형식이 아닙니다.'),

  password: yup
    .string()
    .required('비밀번호는 필수입니다.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
      '영문, 숫자를 포함한 8자 이상이어야 합니다.',
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수입니다.'),
});

export type JoinFormValues = yup.InferType<typeof joinSchema>;
