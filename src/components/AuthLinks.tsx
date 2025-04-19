'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AuthLinks = () => {
    const router = useRouter();

    return (
        <div className="flex justify-end gap-[30px] font-bold">
            <button
                type="button"
                onClick={() => router.push('/login')}
                className="w-[150px] px-5 py-2.5 border-4 border-[#82d21c] rounded-full
        bg-white text-black
        dark:bg-gray-800 dark:text-white
        hover:bg-[#83d21c71] dark:hover:bg-[#a3e6352e]
        transition-colors duration-300"
            >
                로그인
            </button>
            <button
                type="button"
                onClick={() => router.push('/join')}
                className="w-[150px] px-5 py-2.5 border-4 border-[#82d21c] rounded-full
        bg-white text-black
        dark:bg-gray-800 dark:text-white
        hover:bg-[#83d21c71] dark:hover:bg-[#a3e6352e]
        transition-colors duration-300"
            >
                회원가입
            </button>
        </div>
    );
};

export default AuthLinks;
