import React from 'react';
import { ReactComponent as Recent } from '../../assets/images/recent.svg';
import theme from '../../styles/theme';
import Logo from '../../assets/images/logo.png';
import YearIcon from '../../assets/images/year.svg';

const index = () => {
  return (
    <div>
      index
      <div>
        <img src={YearIcon} alt="year" />
        <img src={Logo} alt="logo" width={200} />
        <Recent fill={`${theme.palette.primary[500]}`} height="200" />
      </div>
    </div>
  );
};

export default index;
