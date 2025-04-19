import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { JoinFormValues } from '@schema/joinSchema';
import {useRef} from "react";

interface NickNameInputProps {
    register: UseFormRegister<JoinFormValues>;
    errors: FieldErrors<JoinFormValues>;
    nickNameMessage: string;
    nickNameAvailable: boolean;
    handleCheckNickName: (nickName: string) => void;
    isCheckingNickName: boolean;
}

export default function NickNameInput({
                                          register,
                                          errors,
                                          nickNameMessage,
                                          nickNameAvailable,
                                          handleCheckNickName,
                                          isCheckingNickName = false,
                                      }: NickNameInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <label htmlFor="nickName"  className="block mb-1 font-semibold text-gray-700">닉네임</label>
            <div className="flex gap-2">
                <input
                    {...register('nickName')}
                    name="nickName"
                    type="text"
                    ref={inputRef}
                    placeholder="닉네임 입력"
                    className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                />
                <button
                    type="button"
                    className="px-3 py-2 text-sm font-medium border border-lime-500 rounded-md hover:bg-lime-50 transition"
                    disabled={isCheckingNickName}
                    onClick={() => {
                        if (inputRef.current) handleCheckNickName(inputRef.current.value);
                    }}
                >
                    {isCheckingNickName ? '확인 중...' : '중복 확인'}
                </button>
            </div>
            {errors.nickName && (
                <p className="text-sm text-red-500 mt-1">{errors.nickName.message}</p>
            )}
            <p className={`text-sm mt-1 ${nickNameAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {nickNameMessage}
            </p>
        </div>
    );
}
