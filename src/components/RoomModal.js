import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { rooms } from '../utils/rooms';
// eslint-disable-next-line import/no-unresolved
const Spline = React.lazy(() => import('@splinetool/react-spline'));

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
const RoomModal = ({ show, onClose, selectedUser }) => {
  const [isPending, startTransition] = React.useTransition();

  if (!show) return null;

  const handleClose = () => {
    startTransition(() => {
      onClose();
    });
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <h2>{selectedUser?.nickName}님의 고양이방</h2>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Spline
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                minWidth: '300px',
                minHeight: '300px',
              }}
              scene={rooms[selectedUser?.level - 1]}
            />
          </React.Suspense>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

RoomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedUser: PropTypes.object,
};

export default RoomModal;
