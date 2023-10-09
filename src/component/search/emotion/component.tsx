/** @jsxImportSource @emotion/react */

import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import arrowIcon from '../../../assets/images/rightArrow.svg';
import theme from '../../../styles/theme';
import { ButtonBox } from '../../emotion/component';
import { FindInfoType, MoreButtonType } from '../../../types/globalType';

export const MoreButton = ({ to }: MoreButtonType) => {
  const navigate = useNavigate();
  const MovePage = () => {
    navigate(to);
  };
  return (
    <button
      type="button"
      onClick={MovePage}
      css={css`
        gap: 0.8rem;
        ${theme.typography.body2Bold}
        align-items: center;
      `}
    >
      <p>더보기</p>
      <img src={arrowIcon} alt="icon" />
    </button>
  );
};

export const FindInfo = ({ cnt, text }: FindInfoType) => {
  return (
    <div
      css={css`
        ${theme.typography.body1Bold}
        display: flex;
        flex-direction: row;
      `}
    >
      {!text && !cnt ? (
        '검색 결과가 없습니다. 다른 키워드로 시도해보세요.'
      ) : text ? (
        <>
          <p
            css={css`
              color: ${theme.palette.primary[500]};
            `}
          >
            &apos;{text}&apos;
          </p>
          에 대한 결과입니다
        </>
      ) : (
        <>
          총&nbsp;
          <p
            css={css`
              color: ${theme.palette.primary[500]};
            `}
          >
            {cnt}개
          </p>
          의 문서를 찾았습니다
        </>
      )}
    </div>
  );
};

// todo. 새문서만들기 페이지 이동 버튼함수 구현
export const GoToWrite = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: ${theme.palette.primary[200]};
        padding: 2.4rem 4rem;
        border-radius: 1.2rem;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 0.8rem;
          ${theme.typography.body1Bold}
        `}
      >
        <img src={arrowIcon} alt="icon" />
        <p>회원님이 만들어보세요</p>
      </div>
      <ButtonBox type="default">새 문서 만들기</ButtonBox>
    </div>
  );
};
