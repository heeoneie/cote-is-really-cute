import { useState } from 'react';
import { checkNickName } from '@api/auth';

export function useCheckNickName() {
    const [nickNameMessage, setNickNameMessage] = useState('');
    const [nickNameAvailable, setNickNameAvailable] = useState(false);
    const [isCheckingNickName, setIsCheckingNickName] = useState(false);

    const handleCheckNickName = async (nickName: string) => {
        try {
            setIsCheckingNickName(true);
            const response = await checkNickName(nickName);
            if (response.available) {
                setNickNameMessage('사용 가능한 닉네임입니다.');
                setNickNameAvailable(true);
            } else {
                setNickNameMessage('이미 사용 중인 닉네임입니다.');
                setNickNameAvailable(false);
            }
        } catch (error) {
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
