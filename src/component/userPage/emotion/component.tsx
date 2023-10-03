/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import theme from '../../../styles/theme';
import { ContainerType, LoginInputType } from '../../../types/globalType';
import Logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/user.svg';
import pwIcon from '../../../assets/images/password.svg';
import emailIcon from '../../../assets/images/email.svg';

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
