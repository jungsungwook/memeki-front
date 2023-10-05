import React from 'react';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { Header } from '../../emotion/Header';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { FindInfo } from '../emotion/component';

const MoreGrayBox = () => {
  return (
    <Inner>
      <Header search />
      <Section gap="1.6">
        <SortButton type="pendingDoc" />
        <FindInfo text="개구리" />
        <MemeBoxList>
          <MemeBox />
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

export default MoreGrayBox;
