import React from 'react';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButtonList } from '../../emotion/component';
import { Header } from '../../emotion/Header';

const MemeDoc = () => {
  return (
    <Inner>
      <Header search />
      <Section gap="3.2">
        <SortButtonList />
        {/* <MemeBoxList>
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
          <MemeBox />
        </MemeBoxList> */}
      </Section>
    </Inner>
  );
};

export default MemeDoc;
