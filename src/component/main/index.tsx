import React, { useEffect } from 'react';
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
import { useGetTypePageQuery } from '../../store/controller/pageController';
import { selectUser } from '../../store/slice/userSlice';

const Index = () => {
  const { accessToken } = useSelector(selectUser);
  const location = useLocation();
  const [toggle, setToggle] = React.useState('recent');
  const [category, setCategory] = React.useState('week');
  const queryUrl = `limit=10&page=1`;

  const handleToggle = (data: any) => {
    setToggle(data);
  };

  const handleCategory = (data: any) => {
    setCategory(data);
  };

  useEffect(() => {}, [toggle, category]);

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
        <SortButtonList
          main
          toggle={handleToggle}
          setYearNameSpace={handleCategory}
        />
        <ApiFetcher
          query={useGetTypePageQuery({
            accessToken,
            queryUrl:
              toggle === 'recent' ? queryUrl : `${queryUrl}&type=${category}`,
            type: toggle,
          })}
        >
          {(ListData) => (
            <MemeBoxList>
              {ListData.contents.page.map((meme: any) => (
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
            </MemeBoxList>
          )}
        </ApiFetcher>
      </Section>
    </Inner>
  );
};

export default Index;
