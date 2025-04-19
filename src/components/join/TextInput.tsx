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
    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-700">
                {label === 'confirmPassword' ? '비밀번호 확인' :
                    label === 'password' ? '비밀번호' :
                        label === 'email' ? '이메일' : label}
            </label>
            <input
                {...register(label)}
                type={type}
                placeholder={placeholder}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
            {errors[label] && (
                <p className="text-sm text-red-500 mt-1">{errors[label]?.message}</p>
            )}
        </div>
    );
}
