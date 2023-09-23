/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const RecentImg = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 0.8rem;
      `}
    >
      <img alt="recent" src={`${process.env.PUBLIC_URL}/images/new-box.png`} />
      <div>최신</div>
    </div>
  );
};
