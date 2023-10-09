import React from 'react';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox } from '../../emotion/component';
import { Header1 } from '../../emotion/GlobalStyle';

const FindId = () => {
  return (
    <ModalPage>
      <Header1>아이디 찾기</Header1>
      <LoginInputList>
        <LoginInput type="email" placeholder="이메일" />
      </LoginInputList>
      <ButtonBox type="long">이메일 전송</ButtonBox>
      <TextButtonList>
        <TextButton type="pw" />
        <TextButton type="login" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default FindId;
