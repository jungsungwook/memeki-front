import React, { useEffect, useState } from 'react';
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
  const { control, handleSubmit, watch } = useForm();
  const {
    fields: fieldsMemeSection,
    append: appendMemeSection,
    remove: removeMemeSection,
  } = useFieldArray({
    control,
    name: 'memeSection',
  });
  const {
    fields: fieldsUnderMemeSection,
    append: appendUnderMemeSection,
    remove: removeUnderMemeSection,
  } = useFieldArray({
    control,
    name: 'UnderMemeSection',
  });
  const [title, setTitle] = useState('');
  const [firstSubtitle, setFirstSubtitle] = useState('');
  const [firstContent, setFirstContent] = useState('');
  const [globalNameSpace, setGlobalNameSpace] = useState(0);
  const [yearNameSpace, setYearNameSpace] = useState(0);
  const [newId, setNewId] = useState(1);
  const [pageTextParent, setPageTextParent] = useState([]);
  const { accessToken } = useSelector(selectUser);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'firstSubtitle') {
      setFirstSubtitle(value);
    }
  };
  useEffect(() => {
    const parentFields = JSON.parse(
      JSON.stringify(watch('memeSection'), null, 2),
    );
    const parents = parentFields.map((parent: any, index: number) => ({
      ...parent,
      order: index + 2,
    }));
    setPageTextParent(parents);
    console.log('pageTextParent: ', pageTextParent);
  }, [newId]);
  const onSubmit = (formData: any) => {
    const pageText = [
      {
        title: firstSubtitle,
        content: firstContent,
        order: 1,
        text_uid: '0',
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
    console.log('fieldsMemeSection: ', fieldsMemeSection); // 폼 데이터를 제출할 때 실행되는 함수
    console.log('fieldsUnderMemeSection: ', fieldsUnderMemeSection);
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
          append={appendUnderMemeSection}
          name="firstSubtitle"
          parentTextUid="0"
          order={1}
        />
        <EditorComponent value={firstContent} onChange={setFirstContent} />
      </Section>
      {
        // 첫번째 하위 섹션
        fieldsUnderMemeSection.map(
          (item, index) =>
            `UnderMemeSection[${index}].parent_uid` === '0' && (
              <Section gap="2.4" key={item.id}>
                <Controller
                  name={`UnderMemeSection[${index}].title`}
                  control={control}
                  render={({ field: titleField }) => (
                    <InputBox
                      field={titleField}
                      onClick={removeUnderMemeSection}
                      parentOrder={index + 2}
                      order={index + 2}
                    />
                  )}
                />
                <Controller
                  name={`UnderMemeSection[${index}].content`}
                  control={control}
                  render={({ field: contentField }) => (
                    <EditorComponent
                      value={contentField.value}
                      onChange={contentField.onChange}
                    />
                  )}
                />
              </Section>
            ),
        )
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section gap="2.4">
          {fieldsMemeSection.map((field, index) => {
            const tempArr = [];
            // 부모 Text 컴포넌트 설정
            tempArr.push(
              <Section gap="2.4" key={field.id}>
                <Controller
                  name={`memeSection[${index}].title`}
                  control={control}
                  render={({ field: titleField }) => (
                    <InputBox
                      field={titleField}
                      onClick={removeMemeSection}
                      append={appendUnderMemeSection}
                      // order={pageTextParent[index]}
                      // parentTextUid={field.content}
                    />
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
              </Section>,
            );
            fieldsUnderMemeSection.forEach((underField, underIndex) => {
              if (
                `memeSection[${index}].text_uid` ===
                `UnderMemeSection[${underIndex}].parent_uid`
              ) {
                // 자식 Text 컴포넌트 설정
                tempArr.push(
                  <Section gap="2.4" key={underField.id}>
                    <Controller
                      name={`UnderMemeSection[${underIndex}].title`}
                      control={control}
                      render={({ field: titleField }) => (
                        <InputBox
                          field={titleField}
                          onClick={removeUnderMemeSection}
                          // append={appendUnderMemeSection}  //  NextToDo: n.n.n 목차 할지 정하기
                          parentOrder={index + 2}
                          order={underIndex + 2}
                          // parentTextUid={`memeSection[${index}].id`}
                        />
                      )}
                    />
                    <Controller
                      name={`UnderMemeSection[${underIndex}].content`}
                      control={control}
                      render={({ field: contentField }) => (
                        <EditorComponent
                          value={contentField.value}
                          onChange={contentField.onChange}
                        />
                      )}
                    />
                  </Section>,
                );
              }
            });
            // const result = temparr.map((it2, ix2) => {
            //   return (
            //     <Section gap="2.4" key={field.id}>
            //       <Controller
            //         name={`memeSection[${index}].title`}
            //         control={control}
            //         render={({ field: titleField }) => (
            //           <InputBox
            //             field={titleField}
            //             onClick={removeMemeSection}
            //             append={appendUnderMemeSection}
            //             order={index + 2}
            //             parentTextUid={`memeSection[${index}].id`}
            //           />
            //         )}
            //       />
            //       <Controller
            //         name={`memeSection[${index}].content`}
            //         control={control}
            //         render={({ field: contentField }) => (
            //           <EditorComponent
            //             value={contentField.value}
            //             onChange={contentField.onChange}
            //           />
            //         )}
            //       />
            //     </Section>
            //   );
            // });
            return tempArr;
          })}

          <RightRowAlign>
            <ButtonBox
              type="default"
              gray
              onClick={() => {
                setNewId(newId + 1);
                appendMemeSection({
                  title: '',
                  content: '',
                  text_uid: newId.toString(),
                });
              }}
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
