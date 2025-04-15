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
            <input
                {...register(label)}
                type={type}
                placeholder={placeholder}
                className="w-full border-b-2 border-lime-500 px-2 py-2 outline-none text-lg"
            />
            {errors[label] && (
                <p className="text-sm text-red-500 mt-1">{errors[label]?.message}</p>
            )}
        </div>
    );
}
