'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema, JoinFormValues } from '@schema/joinSchema';
import { useState } from 'react';
import { checkNickName, signUp } from '@api/auth';
import { useRouter } from 'next/navigation';

export default function JoinForm() {
    const router = useRouter();
    const [nickNameMessage, setNickNameMessage] = useState('');
    const [nicknameAvailable, setNicknameAvailable] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<JoinFormValues>({
        resolver: yupResolver(joinSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: JoinFormValues) => {
        if (!nicknameAvailable) {
            setError('nickName', {
                message: '닉네임 중복 확인을 해주세요!',
            });
            return;
        }

        try {
            await signUp(data);
            alert('회원가입이 완료되었습니다!');
            router.push('/login');
        } catch (err: any) {
            alert(err?.message || '회원가입 중 오류가 발생했습니다.');
        }
    };

    const handleCheckNickName = async () => {
        const nickName = watch('nickName');
        if (!nickName) return;

        try {
            const res = await checkNickName(nickName);
            if (res.available) {
                setNicknameAvailable(true);
                setNickNameMessage('사용 가능한 닉네임입니다!');
            } else {
                setNicknameAvailable(false);
                setNickNameMessage('이미 사용 중인 닉네임입니다.');
            }
        } catch (err: any) {
            setNicknameAvailable(false);
            setNickNameMessage(err?.message || '닉네임 확인 중 오류 발생');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md px-4"
        >
            <div>
                <div className="flex gap-2">
                    <input
                        {...register('nickName')}
                        type="text"
                        placeholder="닉네임 입력"
                        className="w-full border-b-2 border-lime-500 px-2 py-2 outline-none text-lg"
                    />
                    <button
                        type="button"
                        onClick={handleCheckNickName}
                        className="whitespace-nowrap px-4 py-2 border-2 border-lime-500 rounded-full font-semibold text-sm hover:bg-lime-100 transition"
                    >
                        중복 확인
                    </button>
                </div>
                <p className={`text-sm mt-1 ${nicknameAvailable ? 'text-cyan-500' : 'text-red-500'}`}>
                    {nickNameMessage || errors.nickName?.message}
                </p>
            </div>

            {/* 이메일 */}
            <div>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="이메일 입력"
                    className="w-full border-b-2 border-lime-500 px-2 py-2 outline-none text-lg"
                />
                <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
            </div>

            {/* 비밀번호 */}
            <div>
                <input
                    {...register('password')}
                    type="password"
                    placeholder="비밀번호 입력"
                    className="w-full border-b-2 border-lime-500 px-2 py-2 outline-none text-lg"
                />
                <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
            </div>

            <div>
                <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="비밀번호 확인"
                    className="w-full border-b-2 border-lime-500 px-2 py-2 outline-none text-lg"
                />
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword?.message}</p>
            </div>
            <button
                type="submit"
                className="w-full py-3 border-4 border-lime-500 rounded-full font-bold hover:bg-lime-100 transition"
            >
                회원가입
            </button>
        </form>
    );
}
