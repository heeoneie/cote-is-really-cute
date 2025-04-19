'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { JoinFormValues } from '@schema/joinSchema';

interface TextInputProps {
    label: keyof JoinFormValues;
    type: 'text' | 'email' | 'password';
    placeholder: string;
    register: UseFormRegister<JoinFormValues>;
    errors: FieldErrors<JoinFormValues>;
}

export default function TextInput({
                                      label,
                                      type,
                                      placeholder,
                                      register,
                                      errors,
                                  }: TextInputProps) {
    const labelText =
        label === 'confirmPassword'
            ? '비밀번호 확인'
            : label === 'password'
                ? '비밀번호'
                : label === 'email'
                    ? '이메일'
                    : label;

    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                {labelText}
            </label>
            <input
                {...register(label)}
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3 border rounded-md
                           bg-white text-black placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-lime-400
                           transition
                           dark:bg-neutral-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
            />
            {errors[label] && (
                <p className="text-sm text-red-500 mt-1">{errors[label]?.message}</p>
            )}
        </div>
    );
}
