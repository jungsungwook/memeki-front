import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Inner, Section } from '../../emotion/GlobalStyle';
import { MemeBox, MemeBoxList, SortButtonList } from '../../emotion/component';
import { Header } from '../../emotion/Header';
import { selectUser } from '../../../store/slice/userSlice';
import { ApiFetcher } from '../../../util/util';
import { useSearchBoxQuery } from '../../../store/controller/pageController';

const MemeDoc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryUrl = `page${location.search}`;
  const { accessToken } = useSelector(selectUser);
  const [globalNameSpace, setGlobalNameSpace] = useState(0);
  const [yearNameSpace, setYearNameSpace] = useState(0);
  // const namespaceParams = new URLSearchParams(location.search).set(NameSpace);

  useEffect(() => {
    if (globalNameSpace) {
      navigate(`/memeDoc?page=1&namespace=${globalNameSpace}`);
    }
    if (yearNameSpace) {
      navigate(`/memeDoc?page=1&namespace=${yearNameSpace}`);
    }
  }, [globalNameSpace, yearNameSpace]);

  return (
    <Inner>
      <Header search />
      <Section gap="3.2">
        <SortButtonList
          setGlobalNameSpace={setGlobalNameSpace}
          setYearNameSpace={setYearNameSpace}
        />
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

export default MemeDoc;
