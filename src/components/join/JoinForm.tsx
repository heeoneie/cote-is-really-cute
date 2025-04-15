'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema, JoinFormValues } from '@schema/joinSchema';
import { useState } from 'react';
import { checkNickName, join } from '@api/auth';
import { useRouter } from 'next/navigation';
import NickNameInput from '@components/join/NickNameInput';
import TextInput from '@components/join/TextInput';
import SubmitButton from '@components/join/SubmitButton';

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
            await join(data);
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
            <NickNameInput
                register={register}
                errors={errors}
                handleCheckNickName={handleCheckNickName}
                nicknameMessage={nickNameMessage}
                nicknameAvailable={nicknameAvailable}
            />

            <TextInput
                label="email"
                type="email"
                placeholder="이메일 입력"
                register={register}
                errors={errors}
            />

            <TextInput
                label="password"
                type="password"
                placeholder="비밀번호 입력"
                register={register}
                errors={errors}
            />

            <TextInput
                label="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                register={register}
                errors={errors}
            />

            <SubmitButton text="회원가입" />
        </form>
    );
}
