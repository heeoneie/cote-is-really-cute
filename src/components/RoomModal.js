import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types'; // PropTypes를 사용해 props 타입 검증

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
  if (!show) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{selectedUser?.nickName}님의 고양이방</h2>
        <p>고양이방 표시하기</p>
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
