import React from 'react';
import { Inner } from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import {
  MemeBox,
  MemeBoxList,
  SearchBar,
  SortButtonList,
} from '../emotion/component';
import { ReactComponent as Recent } from '../../assets/images/recent.svg';
import Logo from '../../assets/images/logo.png';
import YearIcon from '../../assets/images/year.svg';
import theme from '../../styles/theme';

function Detail() {
  return (
    <Inner>
      {/* <Header search /> */}
      <Header />
      index
      <SearchBar large />
      <SearchBar />
      <MemeBoxList>
        <MemeBox />
        <MemeBox />
        <MemeBox />
        <MemeBox />
        <MemeBox />
        <MemeBox />
        <MemeBox />
      </MemeBoxList>
      <SortButtonList main />
      <SortButtonList />
      <MemeBox />
      <img src={YearIcon} alt="icon" />
      <img src={Logo} alt="memeki" width={200} />
      <Recent fill={`${theme.palette.primary[500]}`} height="200" />
    </Inner>
  );
}

export default Detail;
