import React, { useState } from 'react';
import { Inner } from '../../emotion/GlobalStyle';
import { Header } from '../../emotion/Header';
import { InputBox } from '../emotion/component';

const PartEdit = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'subtitle') {
      setSubtitle(value);
    }
  };
  return (
    <Inner>
      <Header search />
      <InputBox title value={title} onChange={handleTitleChange} name="title" />
      <InputBox value={subtitle} onChange={handleTitleChange} name="subtitle" />
    </Inner>
  );
};

export default PartEdit;
