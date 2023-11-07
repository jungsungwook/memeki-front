import React from 'react';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { Header } from '../../emotion/Header';

const Pending = () => {
  return (
    <Inner>
      <Header search />
      <Section gap="3.2">
        <SortButton type="pendingDoc" />
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

export default Pending;
