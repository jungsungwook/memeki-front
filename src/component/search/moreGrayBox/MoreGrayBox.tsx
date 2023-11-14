import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { Header } from '../../emotion/Header';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { ApiFetcher } from '../../../util/util';
import { selectUser } from '../../../store/slice/userSlice';
import { useSearchBoxQuery } from '../../../store/controller/pageController';

const MoreGrayBox = () => {
  const location = useLocation();
  const { accessToken } = useSelector(selectUser);
  const queryUrl = `page${location.search}`;
  return (
    <Inner>
      <Header search />
      <Section gap="1.6">
        <SortButton type="pendingDoc" />
        <ApiFetcher query={useSearchBoxQuery({ accessToken, queryUrl })}>
          {(ListData) => (
            <MemeBoxList>
              {ListData.contents.waiting.page.map((meme: any) => (
                <MemeBox
                  key={meme.id}
                  id={meme.id}
                  type="pending"
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

export default MoreGrayBox;
