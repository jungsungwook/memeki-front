import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { useParentTextPageLogic, useThumbnailLogic } from './hook';
import { selectUser } from '../../store/slice/userSlice';

const Index = () => {
  const {
    handleFileSelect,
    handleDrop,
    thumbnail,
    isLoading,
    GetBackThumbnail,
  } = useThumbnailLogic();
  const {
    parentTextPage,
    childrenTextPage,
    appendParentTextPage,
    changeParentTextPage,
    removeParentTextPage,
    appendChildrenTextPage,
    changeChildrenTextPage,
    removeChildrenTextPage,
  } = useParentTextPageLogic();
  const [title, setTitle] = useState('');
  const [globalNameSpace, setGlobalNameSpace] = useState(0);
  const [yearNameSpace, setYearNameSpace] = useState(0);
  const { accessToken } = useSelector(selectUser);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    }
  };

  const onSubmit = () => {
    const pageText = [...parentTextPage, ...childrenTextPage];
    const sendData = {
      page: {
        namespace: [globalNameSpace, yearNameSpace],
        thumbnail: { thumbnail },
        title: { title },
        is_redirect: 0,
      },
      pageText: { pageText },
    };
    console.log('sendData: ', sendData);
    console.log('pageText: ', pageText);
    console.log('parentTextPage: ', parentTextPage);
    console.log('childrenTextPage: ', childrenTextPage);
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
        {parentTextPage.map((parent, index) => {
          const tempArr = [];
          // 부모 Text 컴포넌트 설정
          tempArr.push(
            <Section gap="2.4" key={parent.text_uid}>
              <InputBox
                value={parent.title}
                onChange={(e) =>
                  changeParentTextPage(index, e.target.value, 'title')
                }
                order={parent.order}
                onClickRemove={() => removeParentTextPage(index)}
                subTitle={index === 0 ? true : undefined}
                parentUid={parent.text_uid}
                append={() => appendChildrenTextPage(parent.text_uid)}
              />
              <EditorComponent
                value={parent.content}
                onChange={(value: any) =>
                  changeParentTextPage(index, value, 'content')
                }
              />
            </Section>,
          );
          childrenTextPage.forEach((children: any, underIndex: number) => {
            if (parent.text_uid === children.parent_uid) {
              // 자식 Text 컴포넌트 설정
              tempArr.push(
                <Section
                  gap="2.4"
                  key={children.parent_uid + children.order.toString()}
                >
                  <InputBox
                    value={children.title}
                    onChange={(e) =>
                      changeChildrenTextPage(
                        underIndex,
                        e.target.value,
                        'title',
                      )
                    }
                    onClickRemove={() =>
                      removeChildrenTextPage(parent.text_uid, underIndex)
                    }
                    // append={appendUnderMemeSection}  //  NextToDo: n.n.n 목차 할지 정하기
                    // parentTextUid={`memeSection[${index}].id`}
                    parentOrder={parent.order}
                    order={children.order}
                  />
                  <EditorComponent
                    value={children.content}
                    onChange={(value: any) =>
                      changeChildrenTextPage(underIndex, value, 'content')
                    }
                  />
                </Section>,
              );
            }
          });

          return tempArr;
        })}

        <RightRowAlign>
          <ButtonBox type="default" gray onClick={appendParentTextPage}>
            단락 추가
          </ButtonBox>
          <ButtonBox onClick={onSubmit} type="default">
            등록
          </ButtonBox>
        </RightRowAlign>
      </Section>
    </WhiteInner>
  );
};

export default Index;
