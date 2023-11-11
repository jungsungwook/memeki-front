import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButton } from '../../emotion/component';
import { Header } from '../../emotion/Header';
import { ApiFetcher } from '../../../util/util';
import { useSearchBoxQuery } from '../../../store/controller/pageController';
import { selectUser } from '../../../store/slice/userSlice';

const Pending = () => {
  const { accessToken } = useSelector(selectUser);
  const location = useLocation();
  const queryUrl = `page${location.search}`;
  return (
    <Inner>
      <Header search />
      <Section gap="3.2">
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

export default Pending;
