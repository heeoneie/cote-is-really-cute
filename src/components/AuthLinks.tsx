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
                className="w-[150px] px-5 py-2.5 border-4 border-[#82d21c] rounded-full bg-white text-black text-base font-bold hover:bg-[#83d21c71]"
            >
                로그인
            </button>
            <button
                type="button"
                onClick={() => router.push('/signup')}
                className="w-[150px] px-5 py-2.5 border-4 border-[#82d21c] rounded-full bg-white text-black text-base font-bold hover:bg-[#83d21c71]"
            >
                회원가입
            </button>
        </div>
    );
};

export default AuthLinks;
