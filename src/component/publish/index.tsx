import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { usePagePostMutation } from '../../store/controller/pageController';

const Index = () => {
  const navigate = useNavigate();
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
  const [pagePost] = usePagePostMutation();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    }
  };

  // Todo. 빈 타이틀, 빈 내용, 걸러서 post보내기
  const onSubmit = async () => {
    try {
      if (globalNameSpace === 0 || yearNameSpace === 0) {
        alert('모든 분류를 선택해주세요');
        return;
      }
      if (title === '') {
        alert('제목을 입력해주세요');
        return;
      }
      if (parentTextPage[0].title === '' || parentTextPage[0].content === '') {
        alert('내용을 입력해주세요');
        return;
      }

      const pageText = [...parentTextPage, ...childrenTextPage];
      const page = {
        namespace: [globalNameSpace, yearNameSpace],
        thumbnail,
        title,
        is_redirect: 0,
      };
      const response = await pagePost({ accessToken, page, pageText });
      if (/^2.{2}$/.test(response.data.statusCode)) {
        navigate('/');
        alert('새로운 밈이 등록되었습니다');
      }
      console.log('response: ', response);
      console.log('page: ', page);
      console.log('pageText: ', pageText);
      console.log('parentTextPage: ', parentTextPage);
      console.log('childrenTextPage: ', childrenTextPage);
    } catch (error) {
      console.log(error);
    }
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
