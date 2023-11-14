import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalPage } from '../../userPage/emotion/component';
import { Body1, Title } from '../../emotion/GlobalStyle';

const PartEdit = () => {
  const navigate = useNavigate();
  return (
    <ModalPage>
      <Title>페이지 준비중입니다</Title>
      <button type="button" onClick={() => navigate(-1)}>
        <Body1>뒤로가기</Body1>
      </button>
    </ModalPage>
  );
};

export default PartEdit;
