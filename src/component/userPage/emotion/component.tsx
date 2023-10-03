/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../../styles/theme';
import { ContainerType } from '../../../types/globalType';

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
        {children}
      </div>
    </div>
  );
};
