import React, { useState } from 'react';
import { Inner, Section } from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import {
  InputBox,
  RightRowAlign,
  ThumbnailButton,
  WhiteInner,
} from './emotion/component';
import { EditorComponent } from './emotion/TextEditor';
import { ButtonBox } from '../emotion/component';

const Index = () => {
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
    <WhiteInner>
      <Header search />
      <Section gap="2.4">
        <ThumbnailButton />
        <InputBox
          title
          value={title}
          onChange={handleTitleChange}
          name="title"
        />
      </Section>
      <Section gap="2.4">
        <InputBox
          value={subtitle}
          onChange={handleTitleChange}
          name="subtitle"
        />
        <EditorComponent />
      </Section>
      <RightRowAlign>
        <ButtonBox type="default" gray>
          단락 추가
        </ButtonBox>
        <ButtonBox type="default">등록</ButtonBox>
      </RightRowAlign>
    </WhiteInner>
  );
};

export default Index;
