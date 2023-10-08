/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import theme from '../../../styles/theme';
import { InputBoxType } from '../../../types/globalType';

export const InputBox = ({ title, value, name, onChange }: InputBoxType) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 1.6rem 3.2rem;
        border: 2px solid ${theme.palette.primary[500]};
        border-radius: 1rem;
      `}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        placeholder={
          title
            ? '밈의 이름을 정의해주세요'
            : '목차번호를 제외한 소제목을 입력해주세요'
        }
        css={css`
          ${theme.typography.body1}
          background-color: transparent;
          width: 100%;
        `}
      />
    </div>
  );
};
