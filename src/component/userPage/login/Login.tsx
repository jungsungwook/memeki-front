import React from 'react';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';

const Login = () => {
  return (
    <ModalPage>
      <LoginInputList>
        <LoginInput type="user" placeholder="아이디" />
        <Line />
        <LoginInput type="pw" placeholder="비밀번호" />
      </LoginInputList>
      <ButtonBox type="long">로그인</ButtonBox>
      <TextButtonList>
        <TextButton type="pw" />
        <TextButton type="id" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default Login;
