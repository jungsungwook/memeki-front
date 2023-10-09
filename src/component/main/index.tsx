import React from 'react';
import { css } from '@emotion/react';
import theme from '../../styles/theme';
import {
  MemeBox,
  MemeBoxList,
  SearchBar,
  SortButtonList,
} from '../emotion/component';
import { Header2, Inner, Section, Title } from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';

const index = () => {
  return (
    <Inner>
      <Header />
      <Section gap="2.4">
        <Title
          style={css`
            text-align: center;
            color: ${theme.palette.primary[500]};
          `}
        >
          Let’s memeki
        </Title>
        <Header2
          style={css`
            text-align: center;
          `}
        >
          예전에 떴던 혹은 현재 뜨고 있는 <br />
          게시물, 신조어가 궁금하신가요? <br />
          밈에 대한 모든 것을 알려드립니다
        </Header2>
      </Section>
      <SearchBar large />
      <Section gap="3.2">
        <SortButtonList main />
        <MemeBoxList>
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
        </MemeBoxList>
      </Section>
    </Inner>
  );
};

export default index;
