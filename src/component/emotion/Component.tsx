/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import theme from '../../styles/theme';
import Logo from '../../assets/images/logo.png';
import likeIcon from '../../assets/images/like.svg';
import { ContainerType } from '../../types/globalType';
import memeCertifyIcon from '../../assets/images/memeCertify.png';

export const SearchBar = ({ large }: { large?: boolean }) => {
  return (
    <div
      css={css`
        border: 3px solid ${theme.palette.primary[300]};
        display: flex;
        align-items: center;
        gap: 3.2rem;
        width: ${large ? `100%` : `59.5rem`};
        padding: 0.8rem 1.6rem;
        border-radius: 0.5rem;
      `}
    >
      <input
        placeholder="밈을 검색해 보세요"
        css={css`
          width: inherit;
          background-color: transparent;
          ${large ? theme.typography.body1 : theme.typography.body2}
        `}
      ></input>
      <SearchIcon
        height={`${large ? '30' : '20'}`}
        width={`${large ? '30' : '20'}`}
      />
    </div>
  );
};

// todo. 썸네일 디폴트 미미키, 동적으로 바꾸기
// 인증박스, 기본박스, 대기박스로 나누기
export const MemeBox = () => {
  return (
    <div
      css={css`
        width: 38.4rem;
        height: 39.5rem;
        border-radius: 1.6rem;
        background: ${theme.palette.primary[500]}; // 기본박스
        /* background: ${theme.palette.gray[300]}; // 대기박스
        color: ${theme.palette.gray[600]}; // 대기박스 */
        padding: 1.6rem;
        position: relative;
      `}
    >
      <img
        src={memeCertifyIcon}
        alt="밈인증"
        loading="lazy"
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          /* visibility: hidden; // 인증마크 숨기기 */
        `}
      />
      <div
        css={css`
          background-color: ${theme.palette.gray.white};
          width: 35.2rem;
          height: 22.4rem;
          border-radius: 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img src={Logo} alt="logo" width={100} />
      </div>
      <div
        css={css`
          ${theme.typography.header2}
          margin: 3.2rem 0 4.8rem;
        `}
      >
        제목...
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          ${theme.typography.body2}
        `}
      >
        <p>발행날짜</p>
        <div
          css={css`
            display: flex;
            gap: 0.4rem;
          `}
        >
          <img src={likeIcon} alt="like" />
          <p>like cnt</p>
        </div>
      </div>
    </div>
  );
};

export const MemeBoxList = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        gap: 2.4rem;
      `}
    >
      {children}
    </div>
  );
};
