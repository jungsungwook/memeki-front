import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import theme from '../../styles/theme';
import {
  MemeBox,
  MemeBoxList,
  SearchBar,
  SortButtonList,
} from '../emotion/component';
import { Header2, Inner, Section, Title } from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import { ApiFetcher } from '../../util/util';
import { useSearchBoxQuery } from '../../store/controller/pageController';
import { selectUser } from '../../store/slice/userSlice';

const Index = () => {
  const { accessToken } = useSelector(selectUser);
  const location = useLocation();
  const queryUrl = `page${location.search}`;
  return (
    <Inner>
      <Header />
      <Section gap="2.4">
        <Title
          style={css`
            text-align: center;
            color: ${theme.palette.primary[500]};
          `}
        >
          Let’s memeki
        </Title>
        <Header2
          style={css`
            text-align: center;
          `}
        >
          예전에 떴던 혹은 현재 뜨고 있는 <br />
          게시물, 신조어가 궁금하신가요? <br />
          밈에 대한 모든 것을 알려드립니다
        </Header2>
      </Section>
      <SearchBar large />
      <Section gap="3.2">
        <SortButtonList main />
        <ApiFetcher query={useSearchBoxQuery({ accessToken, queryUrl })}>
          {(ListData) => (
            <MemeBoxList>
              {ListData.contents.auth.page.map((meme: any) => (
                <MemeBox
                  key={meme.id}
                  id={meme.id}
                  type="auth"
                  thumbnail={meme.thumbnail}
                  title={meme.title}
                  createdAt={meme.createdAt}
                  isLiked={meme.is_liked}
                  likeCount={meme.like_count}
                />
              ))}
              {ListData.contents.recommend.page.map((meme: any) => (
                <MemeBox
                  key={meme.id}
                  id={meme.id}
                  type="recommend"
                  thumbnail={meme.thumbnail}
                  title={meme.title}
                  createdAt={meme.createdAt}
                  isLiked={meme.is_liked}
                  likeCount={meme.like_count}
                />
              ))}
            </MemeBoxList>
          )}
        </ApiFetcher>
      </Section>
    </Inner>
  );
};

export default Index;
