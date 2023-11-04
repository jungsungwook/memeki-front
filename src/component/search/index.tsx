import React from 'react';
import {
  Body1Bold,
  Header2,
  Inner,
  Section,
  SpaceContainer,
} from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import { ButtonBox, SearchBar } from '../emotion/component';
import penIcon from '../../assets/images/pen.svg';
import { FindInfo, GoToWrite, MoreButton } from './emotion/component';

const index = () => {
  return (
    <Inner>
      <Header />
      <Section gap="3.2">
        <SearchBar large />
        <ButtonBox type="square">
          <img src={penIcon} alt="icon" />
          <Body1Bold>새 문서</Body1Bold>
        </ButtonBox>

        <Section gap="1.6">
          <SpaceContainer>
            <Header2>추천 문서</Header2>
            <MoreButton to="/search/more" />
          </SpaceContainer>
          <FindInfo cnt={2} />
          <GoToWrite />
        </Section>

        <Section gap="1.6">
          <SpaceContainer>
            <Header2>대기 문서</Header2>
            <MoreButton to="/search/morePending" />
          </SpaceContainer>
        </Section>
      </Section>
    </Inner>
  );
};

export default index;
