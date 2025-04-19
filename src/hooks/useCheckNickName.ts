import { useState } from 'react';
import { checkNickName } from '@api/auth';

export function useCheckNickName() {
    const [nickNameMessage, setNickNameMessage] = useState('');
    const [nickNameAvailable, setNickNameAvailable] = useState(false);
    const [isCheckingNickName, setIsCheckingNickName] = useState(false);

    const handleCheckNickName = async (nickName: string) => {
        setIsCheckingNickName(true);
        try {
            const response = await checkNickName(nickName);
            setNickNameMessage(response.message || '사용 가능한 닉네임입니다.');
            setNickNameAvailable(true);
        } catch (error: unknown) {
            setNickNameMessage('닉네임 확인 중 오류가 발생했습니다.');
            setNickNameAvailable(false);
        } finally {
            setIsCheckingNickName(false);
        }
    };

    return {
        nickNameMessage,
        nickNameAvailable,
        handleCheckNickName,
        isCheckingNickName,
    };
}
