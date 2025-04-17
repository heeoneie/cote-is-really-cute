'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema, JoinFormValues } from '@schema/joinSchema';
import { join } from '@api/auth';
import { useRouter } from 'next/navigation';
import NickNameInput from '@components/join/NickNameInput';
import TextInput from '@components/join/TextInput';
import SubmitButton from '@components/join/SubmitButton';
import { useCheckNickName } from '@hooks/useCheckNickName';

export default function JoinForm() {
    const router = useRouter();

    const methods = useForm<JoinFormValues>({
        resolver: yupResolver(joinSchema),
        mode: 'onBlur',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = methods;

    const {
        handleCheckNickName,
        nickNameMessage,
        nickNameAvailable,
    } = useCheckNickName();

    const onSubmit = async (data: JoinFormValues) => {
        if (!nickNameAvailable) {
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

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-md px-6 py-10 bg-white rounded-xl shadow-md"
            >
                <NickNameInput
                    register={register}
                    errors={errors}
                    nickNameMessage={nickNameMessage}
                    nickNameAvailable={nickNameAvailable}
                    handleCheckNickName={handleCheckNickName}
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
        </FormProvider>
    );
}
