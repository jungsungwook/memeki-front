import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Section } from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import {
  AttrButton,
  InputBox,
  RightRowAlign,
  WhiteInner,
} from './emotion/component';
import { ButtonBox } from '../emotion/component';
import { EditorComponent } from './emotion/TextEditor';
import '../../styles/quill.css';

const Index = () => {
  const { control, handleSubmit, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'memeSection',
  });
  const [title, setTitle] = useState('');
  const [firstSubtitle, setFirstSubtitle] = useState('');
  const [firstContent, setFirstContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'firstSubtitle') {
      setFirstSubtitle(value);
    }
  };
  const onSubmit = (formData: any) => {
    const pageText = [
      {
        title: firstSubtitle,
        content: firstContent,
      },
      ...formData.memeSection,
    ];
    console.log(pageText); // 폼 데이터를 제출할 때 실행되는 함수
    console.log('formData: ', formData);
  };

  return (
    <WhiteInner>
      <Header search />
      <Section gap="2.4">
        <AttrButton />
        <InputBox
          title
          value={title}
          onChange={handleTitleChange}
          name="title"
        />
      </Section>
      <Section gap="2.4">
        <InputBox
          value={firstSubtitle}
          onChange={handleTitleChange}
          name="firstSubtitle"
        />
        <EditorComponent value={firstContent} onChange={setFirstContent} />
      </Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section gap="2.4">
          {fields.map((field, index) => (
            <Section gap="2.4" key={field.id}>
              <Controller
                name={`memeSection[${index}].title`}
                control={control}
                render={({ field: titleField }) => (
                  <InputBox field={titleField} onClick={remove} />
                )}
              />
              <Controller
                name={`memeSection[${index}].content`}
                control={control}
                render={({ field: contentField }) => (
                  <EditorComponent
                    value={contentField.value}
                    onChange={contentField.onChange}
                  />
                )}
              />
            </Section>
          ))}

          <RightRowAlign>
            <ButtonBox
              type="default"
              gray
              onClick={() => append({ title: '', content: '' })}
            >
              단락 추가
            </ButtonBox>
            <ButtonBox submit type="default">
              등록
            </ButtonBox>
          </RightRowAlign>
        </Section>
      </form>
    </WhiteInner>
  );
};

export default Index;
