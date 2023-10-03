/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import { ContainerType, NavItemProps } from '../../types/globalType';
import Logo from '../../assets/images/logo.png';
import { SearchBar } from './component';

const Nav = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        background-color: ${theme.palette.semantic.background};
        z-index: 99;
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        padding: 2.4rem 0;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 120rem;
          justify-content: space-between;
          align-items: center;
        `}
      >
        {children}
      </div>
    </div>
  );
};

const NavList = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 5rem;
        color: ${theme.palette.primary[500]};
        ${theme.typography.body1};
      `}
    >
      {children}
    </div>
  );
};

const NavItem = ({ children, to }: NavItemProps) => {
  return (
    <Link to={to}>
      <p
        css={css`
          text-decoration-line: none;
          transition: 0.5s all;
          &:hover {
            color: rgba(181, 166, 104, 0.7);
          }
        `}
      >
        {children}
      </p>
    </Link>
  );
};

// Todo: accessToken 유무에 따라 헤더 메뉴 나누기(회원/비회원)
// react router dom의 쿼리파라미터 주소구별로 헤더 모양 바꾸기(서치바 유/무)
export const Header = ({
  search, // isLogin,
}: {
  search?: boolean;
  // isLogin?: boolean;
}) => {
  // const typeArray = isLogin
  //   ? ['밈문서', '대기문서', '마이페이지', '로그아웃']
  //   : ['밈문서', '대기문서', '로그인'];
  return (
    <Nav>
      <Link to="/">
        <img src={Logo} alt="memeki" width={120} />
      </Link>
      {search && <SearchBar />}
      <NavList>
        <NavItem to="/memeDoc">밈문서</NavItem>
        <NavItem to="/pending">대기문서</NavItem>
        <NavItem to="/login">로그인</NavItem>
      </NavList>
    </Nav>
  );
};
