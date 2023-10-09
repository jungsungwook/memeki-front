import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  SignUpLevel,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Header1 } from '../../emotion/GlobalStyle';

const Final = () => {
  const navigate = useNavigate();
  const HandelSubmitClick = () => {
    navigate('/');
  };
  return (
    <ModalPage>
      <Header1>회원가입 정보 입력</Header1>

      <SignUpLevel />

      <LoginInputList>
        <LoginInput type="user" placeholder="아이디" check />
        <Line />
        <LoginInput type="pw" placeholder="비밀번호" />
        <Line />
        <LoginInput type="pw" placeholder="비밀번호 확인" />
      </LoginInputList>

      <LoginInputList>
        <LoginInput type="user" placeholder="닉네임" check />
        <Line />
        <LoginInput type="email" placeholder="이메일" />
      </LoginInputList>

      <ButtonBox type="long" onClick={HandelSubmitClick}>
        회원가입
      </ButtonBox>
    </ModalPage>
  );
};

export default Final;
