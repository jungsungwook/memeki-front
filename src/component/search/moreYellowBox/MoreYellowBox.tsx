import React from 'react';
import { Header } from '../../emotion/Header';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { FindInfo } from '../emotion/component';

const MoreYellowBox = () => {
  return (
    <Inner>
      <Header search />
      <Section gap="1.6">
        <SortButton type="defaultDoc" />
        <FindInfo text="개구리" />
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

export default MoreYellowBox;
