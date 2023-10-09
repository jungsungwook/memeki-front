/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import theme from '../../styles/theme';
import {
  ContainerType,
  SectionType,
  StyleContainerType,
} from '../../types/globalType';

/**
 * 1200px의 Inner 컴포넌트, 가운데 정렬 처리 됨.
 * @param children 컴포넌트 안에 넣을 자식 요소
 */
export const Inner = ({ children }: ContainerType) => (
  <section
    css={css`
      position: relative;
      width: 120rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 9.6rem;
    `}
  >
    {children}
  </section>
);

export const Title = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.title}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Header1 = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.header1}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Header2 = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.header2}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body1 = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body1}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body1Bold = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body1Bold}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body2 = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body2}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body2Bold = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body2Bold}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body3 = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body3}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Body3Bold = ({ children, style }: StyleContainerType) => (
  <div
    css={css`
      ${theme.typography.body3Bold}
      ${style}
    `}
  >
    {children}
  </div>
);

export const Section = ({ children, gap }: SectionType) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      gap: ${gap}rem;
      width: 100%;
    `}
  >
    {children}
  </div>
);

// 가로 사이의 간격을 멀게 하는 컴포넌트
export const SpaceContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      {children}
    </div>
  );
};
Section.defaultProps = {
  gap: 0,
};
