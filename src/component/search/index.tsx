import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Header2,
  Inner,
  Section,
  SpaceContainer,
} from '../emotion/GlobalStyle';
import { Header } from '../emotion/Header';
import { MemeBox, MemeBoxList, SearchBar } from '../emotion/component';
import { FindInfo, GoToWrite, MoreButton } from './emotion/component';
import { useSearchBoxQuery } from '../../store/controller/pageController';
import { selectUser } from '../../store/slice/userSlice';
import { ApiFetcher } from '../../util/util';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const limit = new URLSearchParams(location.search).get('limit');
  const search = new URLSearchParams(location.search).get('search');
  const { accessToken } = useSelector(selectUser);
  const pageData = {
    limit,
    search,
  };

  const handleBoxClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Inner>
      <Header />
      <Section gap="3.2">
        <SearchBar large />
        {accessToken && <GoToWrite btn accessToken={accessToken} />}

        <Section gap="1.6">
          <ApiFetcher query={useSearchBoxQuery({ accessToken, pageData })}>
            {(ListData) =>
              /^2.{2}$/.test(ListData.statusCode) && (
                <>
                  <SpaceContainer>
                    <Header2>추천 문서</Header2>
                    {ListData.contents.auth.count +
                      ListData.contents.recommend.count >
                      6 && <MoreButton to="/search/more" />}
                  </SpaceContainer>
                  <FindInfo
                    cnt={
                      ListData.contents.auth.count +
                      ListData.contents.recommend.count
                    }
                  />
                  <MemeBoxList>
                    {ListData.contents.auth.page.map((meme: any) => (
                      <MemeBox
                        key={meme.id}
                        type="auth"
                        thumbnail={meme.thumbnail}
                        title={meme.title}
                        createdAt={meme.createdAt}
                        isLiked={meme.is_liked}
                        likeCount={meme.like_count}
                        onClick={() => handleBoxClick(meme.id)}
                      />
                    ))}
                    {ListData.contents.auth.count < 6 &&
                      ListData.contents.recommend.page
                        .slice(0, 6 - ListData.contents.auth.count)
                        .map((meme: any) => (
                          <MemeBox
                            key={meme.id}
                            type="recommend"
                            thumbnail={meme.thumbnail}
                            title={meme.title}
                            createdAt={meme.createdAt}
                            isLiked={meme.is_liked}
                            likeCount={meme.like_count}
                            onClick={() => handleBoxClick(meme.id)}
                          />
                        ))}
                  </MemeBoxList>
                </>
              )
            }
          </ApiFetcher>
        </Section>

        <Section gap="1.6">
          <ApiFetcher query={useSearchBoxQuery({ accessToken, pageData })}>
            {(ListData) => (
              <>
                <SpaceContainer>
                  <Header2>대기 문서</Header2>
                  {ListData.contents.waiting.count > 6 && (
                    <MoreButton to="/search/morePending" />
                  )}
                </SpaceContainer>
                <FindInfo cnt={ListData.contents.waiting.count} />
                <MemeBoxList>
                  {ListData.contents.waiting.page.map((meme: any) => (
                    <MemeBox
                      key={meme.id}
                      type="pending"
                      thumbnail={meme.thumbnail}
                      title={meme.title}
                      createdAt={meme.createdAt}
                      isLiked={meme.is_liked}
                      likeCount={meme.like_count}
                      onClick={() => handleBoxClick(meme.id)}
                    />
                  ))}
                </MemeBoxList>
              </>
            )}
          </ApiFetcher>
        </Section>
      </Section>
    </Inner>
  );
};

export default Index;
