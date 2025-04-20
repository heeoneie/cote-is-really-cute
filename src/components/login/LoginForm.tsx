'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from '@components/login/TextInput';
import ErrorText from '@components/login//ErrorText';
import { loginUser } from '@api/auth';
import useAuthStore from '@store/authStore';
import useUserStore from '@store/userStore';
import toast from 'react-hot-toast';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onChange' });
  const [loginError, setLoginError] = useState('');
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  const { setEmail } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      const { token } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('email', data.email);

      setEmail(data.email);
      setIsLoggedIn(true);
      toast.success('로그인 성공!');

      router.push('/');
    } catch (error: unknown) {
      console.log('로그인 에러' + error);
      toast.error('이메일 또는 비밀번호가 틀렸습니다');
      setLoginError('이메일 또는 비밀번호가 틀렸습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="login-heading"
      className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
    >
      <h1
        id="login-heading"
        className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
      >
        로그인
      </h1>

      <TextInput
        label="이메일"
        autoComplete="email"
        type="email"
        placeholder="이메일 입력"
        {...register('email', { required: '이메일은 필수입니다' })}
        error={errors.email?.message}
      />

      <TextInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        {...register('password', { required: '비밀번호는 필수입니다' })}
        error={errors.password?.message}
      />

      {loginError && <ErrorText message={loginError} />}

      <button
        type="submit"
        disabled={isLoading}
        aria-label="로그인"
        className="w-full mt-6 bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-full transition"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        계정이 없으신가요?{' '}
        <button
          type="button"
          onClick={() => router.push('/join')}
          className="text-lime-600 dark:text-lime-400 font-medium hover:underline"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
