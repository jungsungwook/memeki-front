import React, { useState } from 'react';
import { Inner } from '../../emotion/GlobalStyle';
import { Header } from '../../emotion/Header';
import { InputBox } from '../emotion/component';

const PartEdit = () => {
  return (
    <Inner>
      <Header search />
      <InputBox title />
      <InputBox />
    </Inner>
  );
};

export default PartEdit;
