/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useRef } from 'react';
import theme from '../../../styles/theme';
import {
  ContainerType,
  InputBoxType,
  StyleContainerType,
} from '../../../types/globalType';
import { ButtonBox, SelectBox } from '../../emotion/component';
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
        gap: 4.8rem;
        padding: 4rem 3.2rem;
        margin-top: 16rem;
        border-radius: 1.6rem;
      `}
    >
      {children}
    </section>
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
export const InputBox = ({
  title,
  value,
  name,
  onChange,
  onClickRemove,
  order,
  parentOrder,
  parentUid,
  append,
  subTitle,
}: InputBoxType) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      {!title && (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 2rem;
          `}
        >
          {append && (
            <ButtonBox type="default" gray onClick={append}>
              하위 단락 추가
            </ButtonBox>
          )}
          <p>
            <b>목차 번호: {parentOrder ? `${parentOrder}.${order}` : order}</b>
          </p>
          {!(title || subTitle) && (
            <RightRowAlign>
              <button type="button" onClick={onClickRemove}>
                ✖
              </button>
            </RightRowAlign>
          )}
        </div>
      )}

      <div
        css={css`
          width: 100%;
          padding: 1.6rem 3.2rem;
          border: 2px solid ${theme.palette.primary[500]};
          border-radius: 1rem;
        `}
      >
        <input
          value={value}
          name={name}
          onChange={onChange}
          type="text"
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
    </div>
  );
};

export const AttrButton = ({
  onDrop,
  onChange,
  imgUrl,
  isLoading,
  deleteBtn,
  setGlobalNameSpace,
  setYearNameSpace,
}: {
  onDrop: any;
  onChange: any;
  imgUrl: string;
  isLoading: boolean;
  deleteBtn: () => void;
  setGlobalNameSpace: any;
  setYearNameSpace: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const registerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            border: 2px solid ${theme.palette.primary[500]};
            border-radius: 1rem;
            width: fit-content;
            align-items: center;
            padding: 1.6rem 1.6rem 1.6rem 5rem;
            gap: 3.2rem;
          `}
        >
          <SelectBox
            type="global"
            publish="국가별 분류 선택"
            setGlobalNameSpace={setGlobalNameSpace}
          />
          <SelectBox
            type="year"
            publish="년도별 분류 선택"
            setYearNameSpace={setYearNameSpace}
          />
        </div>
        <RightRowAlign
          style={css`
            border: 2px solid ${theme.palette.primary[500]};
            border-radius: 1rem;
            width: fit-content;
            padding: 0.8rem 1.6rem;
          `}
        >
          <Body1>대표 이미지 : </Body1>
          <ButtonBox type="square" onClick={registerClick}>
            등록
          </ButtonBox>
          <ButtonBox type="square" gray onClick={deleteBtn}>
            이미지 제거
          </ButtonBox>
        </RightRowAlign>
      </div>
      <div
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        css={css`
          display: flex;
          border: 2px solid ${theme.palette.primary[500]};
          border-radius: 1rem;
          width: fit-content;
          padding: 1.6rem;
          margin: auto;
        `}
      >
        {isLoading ? (
          '로딩 중...'
        ) : (
          <img
            src={imgUrl}
            alt=""
            css={css`
              max-width: 35.2rem;
              max-height: 22.4rem;
            `}
          />
        )}
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png, image/bmp"
          ref={fileInputRef}
          onChange={onChange}
          css={css`
            display: none;
          `}
        />
      </div>
    </div>
  );
};
