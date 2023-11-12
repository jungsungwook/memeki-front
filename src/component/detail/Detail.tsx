import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../emotion/Header';
import { WhiteInner } from '../publish/emotion/component';
import { ApiFetcher } from '../../util/util';
import {
  useGetDetailQuery,
  useLikeMutation,
} from '../../store/controller/pageController';
import { selectUser } from '../../store/slice/userSlice';
import {
  Body1,
  Body1Bold,
  Section,
  SpaceContainer,
  Title,
} from '../emotion/GlobalStyle';
import { IndexView, TextPageComponent } from './component';
import { LikeButton } from '../emotion/component';

// Todo. Dompurify lib 사용하여 에디터에서 받아온 값을 보여주며 해킹문제예방
function Detail() {
  const { accessToken } = useSelector(selectUser);
  const { id } = useParams();
  const [like] = useLikeMutation();

  const LikeClick = async () => {
    try {
      if (!accessToken) return;

      const response = await like({ accessToken, id });
      if (/^2.{2}$/.test(response.data.statusCode)) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WhiteInner>
      <Header />
      <ApiFetcher query={useGetDetailQuery({ accessToken, id })}>
        {(data) => (
          <Section gap="8">
            <Section gap="2.4">
              <SpaceContainer end>
                <Title primary>{data.contents.page.title}</Title>
                <Link to="update">
                  <Body1Bold primary>[편집]</Body1Bold>
                </Link>
              </SpaceContainer>
              <SpaceContainer end>
                <div>
                  <Body1>
                    <b>생성일: </b>
                    {data.contents.page.createdAt}
                  </Body1>
                  <Body1>
                    <b>수정일: </b>
                    {data.contents.page.updatedAt}
                  </Body1>
                </div>
                {/* <Body1>댓</Body1> */}
                <LikeButton
                  isLiked={data.contents.page.is_liked}
                  onClick={LikeClick}
                >
                  {data.contents.page.like_count}
                </LikeButton>
              </SpaceContainer>
            </Section>
            <IndexView pageText={data.contents.pageText} />
            {data.contents.pageText.map((parent: any) => {
              const tempArr = [];
              tempArr.push(
                <TextPageComponent
                  title={parent.title}
                  order={parent.order}
                  content={parent.content}
                />,
              );
              if (parent.children) {
                parent.children.forEach((children: any) => {
                  tempArr.push(
                    <TextPageComponent
                      title={children.title}
                      order={`${parent.order}.${children.order}`}
                      content={children.content}
                    />,
                  );
                });
              }
              return tempArr;
            })}
          </Section>
        )}
      </ApiFetcher>
    </WhiteInner>
  );
}

export default Detail;
