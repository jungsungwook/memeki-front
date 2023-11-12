/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import DOMPurify from 'dompurify';
import {
  Body1,
  Body1Bold,
  Header1,
  SpaceContainer,
} from '../emotion/GlobalStyle';
import underArrow from '../../assets/images/selectBoxArrow.svg';
import theme from '../../styles/theme';

export const IndexView = ({ pageText }: { pageText: any }) => {
  return (
    <div
      css={css`
        padding: 16px 32px;
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        background-color: ${theme.palette.primary[100]};
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.15);
        border-radius: 1.6rem;
        color: ${theme.palette.gray[500]};
        width: fit-content;
      `}
    >
      <Header1>목차</Header1>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          color: ${theme.palette.gray[400]};
        `}
      >
        {pageText.map((parent: any) => {
          const tempArr = [];
          tempArr.push(
            <Body1Bold>
              {parent.order}. {parent.title}
            </Body1Bold>,
          );
          if (parent.children) {
            parent.children.forEach((children: any) => {
              tempArr.push(
                <Body1Bold
                  style={css`
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    margin-left: 0.8rem;
                    color: ${theme.palette.gray[400]};
                  `}
                >
                  {parent.order}.{children.order} {children.title}
                </Body1Bold>,
              );
            });
          }
          return tempArr;
        })}
      </div>
    </div>
  );
};

export const TextPageComponent = ({
  title,
  order,
  content,
}: {
  title: string;
  order: string;
  content: string;
}) => {
  const sanitizer = DOMPurify.sanitize;
  return (
    <div>
      <SpaceContainer end>
        <div
          css={css`
            display: flex;
            gap: 2rem;
          `}
        >
          <img src={underArrow} alt="" />
          <Header1>
            {order}. {title}
          </Header1>
        </div>
        {/* <Body1Bold primary>[편집]</Body1Bold> */}
      </SpaceContainer>
      <Body1
        style={css`
          border-top: ${theme.palette.gray[300]} solid 1px;
          padding-top: 1.6rem;
          margin-top: 1.6rem;
        `}
      >
        <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }}></div>
      </Body1>
    </div>
  );
};
