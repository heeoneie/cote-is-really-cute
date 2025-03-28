import React, { Suspense, useTransition } from 'react';
import styled from '@emotion/styled';
import { rooms } from '@utils/rooms';
import { User } from '../@types/user';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface RoomModalProps {
  show: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;
const RoomModal: React.FC<RoomModalProps> = ({
  show,
  onClose,
  selectedUser,
}) => {
  const [isPending, startTransition] = useTransition();

  if (!show) return null;

  const handleClose = () => {
    startTransition(() => {
      onClose();
    });
  };

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>×</CloseButton>
        <h2>{selectedUser?.nickName}님의 방</h2>
        <Suspense fallback={<div>방을 불러오는 중...</div>}>
          <Spline scene={rooms[Math.floor(Math.random() * rooms.length)]} />
        </Suspense>
      </ModalContainer>
    </ModalBackground>
  );
};

export default RoomModal;
