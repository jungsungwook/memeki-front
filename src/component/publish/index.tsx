import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useThumbnailLogic } from './hook';
import { selectUser } from '../../store/slice/userSlice';

const Index = () => {
  const {
    handleFileSelect,
    handleDrop,
    thumbnail,
    isLoading,
    GetBackThumbnail,
  } = useThumbnailLogic();
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'memeSection',
  });
  const [title, setTitle] = useState('');
  const [firstSubtitle, setFirstSubtitle] = useState('');
  const [firstContent, setFirstContent] = useState('');
  const [globalNameSpace, setGlobalNameSpace] = useState(0);
  const [yearNameSpace, setYearNameSpace] = useState(0);
  const { accessToken } = useSelector(selectUser);

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
    const sendData = {
      page: {
        namespace: [globalNameSpace, yearNameSpace],
        thumbnail: { thumbnail },
        title: { title },
        is_redirect: 0,
      },
      pageText: { pageText },
    };
    console.log(pageText); // 폼 데이터를 제출할 때 실행되는 함수
    console.log(fields);
    console.log('sendData: ', sendData);
  };

  return (
    <WhiteInner>
      <Header search />
      <Section gap="2.4">
        <AttrButton
          onDrop={handleDrop}
          onChange={handleFileSelect}
          deleteBtn={GetBackThumbnail}
          setGlobalNameSpace={setGlobalNameSpace}
          setYearNameSpace={setYearNameSpace}
          imgUrl={thumbnail}
          isLoading={isLoading}
        />
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
          order={1}
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
