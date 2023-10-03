/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';
import {
  ContainerType,
  LoginInputType,
  TextButtonType,
} from '../../../types/globalType';
import Logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.svg';
import pwIcon from '../../../assets/images/password.svg';
import emailIcon from '../../../assets/images/email.svg';
import { Body2 } from '../../emotion/GlobalStyle';

export const ModalPage = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4rem;
          justify-content: center;
          align-items: center;
          width: 60rem;
          background: ${theme.palette.gray.white};
          border-radius: 5rem;
          border: 1px solid ${theme.palette.primary[500]};
          padding: 4.8rem;
        `}
      >
        <Link to="/">
          <img src={Logo} alt="memeki" width={150} />
        </Link>
        {children}
      </div>
    </div>
  );
};

export const LoginInput = ({ type, placeholder }: LoginInputType) => {
  const src = {
    user: userIcon,
    pw: pwIcon,
    email: emailIcon,
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 2.4rem;
        width: 100%;
        ${theme.typography.body2}
      `}
    >
      <img src={src[type]} alt="icon" />
      <input
        placeholder={placeholder}
        css={css`
          width: 100%;
        `}
      />
    </div>
  );
};

export const LoginInputList = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.8rem 4rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
      `}
    >
      {children}
    </div>
  );
};

export const TextButton = ({ type, noLine }: TextButtonType) => {
  const typeData = {
    id: '아이디 찾기',
    pw: '비밀번호 찾기',
    login: '로그인',
    signUp: '회원가입',
  };
  return (
    <Link to={`/${type}`}>
      <div
        css={css`
          padding: 0 2.4rem;
          border-right: ${noLine
            ? 'none'
            : `1px solid ${theme.palette.gray[500]}`};
        `}
      >
        {typeData[type]}
      </div>
    </Link>
  );
};

export const TextButtonList = ({ children }: ContainerType) => {
  return (
    <Body2
      style={css`
        display: flex;
        flex-direction: row;
      `}
    >
      {children}
    </Body2>
  );
};
