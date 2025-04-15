'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { JoinFormValues } from '@schema/joinSchema';

interface NickNameInputProps {
    register: UseFormRegister<JoinFormValues>;
    errors: FieldErrors<JoinFormValues>;
    handleCheckNickName: () => void;
    nicknameMessage: string;
    nicknameAvailable: boolean;
}

export default function NickNameInput({
                                          register,
                                          errors,
                                          handleCheckNickName,
                                          nicknameMessage,
                                          nicknameAvailable,
                                      }: NickNameInputProps) {
    return (
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
                {nicknameMessage || errors.nickName?.message}
            </p>
        </div>
    );
}
