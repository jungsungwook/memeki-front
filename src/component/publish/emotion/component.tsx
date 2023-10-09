/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import theme from '../../../styles/theme';
import {
  ContainerType,
  InputBoxType,
  StyleContainerType,
} from '../../../types/globalType';
import { ButtonBox } from '../../emotion/component';
import { Body1 } from '../../emotion/GlobalStyle';

export const WhiteInner = ({ children }: ContainerType) => {
  return (
    <section
      css={css`
        position: relative;
        background-color: ${theme.palette.gray.white};
        width: 120rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 8rem;
        padding: 4rem 3.2rem;
      `}
    >
      {children}
    </section>
  );
};

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

export const RightRowAlign = ({ children, style }: StyleContainerType) => {
  return (
    <div
      css={css`
        margin-left: auto;
        display: flex;
        gap: 1.6rem;
        flex-direction: row;
        align-items: center;
        ${style}
      `}
    >
      {children}
    </div>
  );
};

export const ThumbnailButton = () => {
  return (
    <RightRowAlign
      style={css`
        border: 2px solid ${theme.palette.primary[500]};
        border-radius: 1rem;
        width: fit-content;
        padding: 0.8rem 1.6rem;
      `}
    >
      <Body1>대표 이미지 : </Body1>
      <ButtonBox type="square">등록</ButtonBox>
      <ButtonBox type="square" gray>
        미리보기
      </ButtonBox>
    </RightRowAlign>
  );
};
