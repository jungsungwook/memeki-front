import React from 'react';
import {
  Header2,
  Inner,
  Section,
  SpaceContainer,
} from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import { SearchBar } from '../emotion/component';
import { FindInfo, GoToWrite, MoreButton } from './emotion/component';
import { useSearchBoxQuery } from '../../store/controller/pageController';

const Index = () => {
  // const [searchBox, { isLoading }] = useSearchBoxQuery();
  return (
    <Inner>
      <Header />
      <Section gap="3.2">
        <SearchBar large />
        <GoToWrite btn />

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

export default Index;
