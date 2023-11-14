import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Header } from '../../emotion/Header';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { ApiFetcher } from '../../../util/util';
import { selectUser } from '../../../store/slice/userSlice';
import { useSearchBoxQuery } from '../../../store/controller/pageController';

const MoreYellowBox = () => {
  const location = useLocation();
  const { accessToken } = useSelector(selectUser);
  const queryUrl = `page${location.search}`;

  return (
    <Inner>
      <Header search />
      <Section gap="1.6">
        <SortButton type="defaultDoc" />
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

export default MoreYellowBox;
