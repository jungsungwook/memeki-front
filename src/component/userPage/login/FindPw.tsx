import React from 'react';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Header1 } from '../../emotion/GlobalStyle';

const FindPw = () => {
  return (
    <ModalPage>
      <Header1>비밀번호 찾기</Header1>
      <LoginInputList>
        <LoginInput type="user" placeholder="아이디" />
        <Line />
        <LoginInput type="email" placeholder="이메일" />
      </LoginInputList>
      <ButtonBox type="long">이메일 전송</ButtonBox>
      <TextButtonList>
        <TextButton type="id" />
        <TextButton type="login" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default FindPw;
