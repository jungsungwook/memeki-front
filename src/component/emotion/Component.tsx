/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactComponent as SearchIcon } from '../../assets/images/search.svg';
import theme from '../../styles/theme';

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
