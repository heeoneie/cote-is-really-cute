'use client';

import { UseFormRegister, FieldErrors, useFormContext } from 'react-hook-form';
import { JoinFormValues } from '@schema/joinSchema';

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
  const { getValues } = useFormContext();

  return (
    <div>
      <label
        htmlFor="nickName"
        className="block mb-1 font-semibold text-gray-700 dark:text-gray-300"
      >
        닉네임
      </label>
      <div className="flex gap-2">
        <input
          {...register('nickName')}
          name="nickName"
          type="text"
          placeholder="닉네임 입력"
          className="flex-1 px-4 py-3 border rounded-md
                     bg-white text-black placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-lime-400
                     transition
                     dark:bg-neutral-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
        />
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium border border-lime-500
                     rounded-md hover:bg-lime-50
                     dark:hover:bg-lime-900 dark:border-lime-400 dark:text-white
                     transition"
          disabled={isCheckingNickName}
          onClick={() => {
            const currentNickName = getValues('nickName');
            handleCheckNickName(currentNickName);
          }}
        >
          {isCheckingNickName ? '확인 중...' : '중복 확인'}
        </button>
      </div>
      {errors.nickName && (
        <p className="text-sm text-red-500 mt-1">{errors.nickName.message}</p>
      )}
      <p
        className={`text-sm mt-1 ${
          nickNameAvailable ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {nickNameMessage}
      </p>
    </div>
  );
}
