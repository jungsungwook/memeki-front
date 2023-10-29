import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slice/userSlice';
import { Body1 } from '../component/emotion/GlobalStyle';
import { FetcherProps } from '../types/globalType';

// Todo.로그인이 필요한 api에서 401이 뜨면 이 함수 호출하기
// 함수 test하기
export const RefreshTokenUtil = async () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  try {
    const response = await axios.get('https://api.memeki.kr/auth/refresh');

    if (response.data.statusCode === '200') {
      const { accessToken } = response.data.contents;
      dispatch(setUser({ accessToken }));
    } else if (response.data.statusCode === '401') {
      alert('다시 로그인 해주세요');
      navigate('/login');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
};

export const TokenToRedux = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionStorageToken = sessionStorage.getItem('token');

    dispatch(setUser({ accessToken: sessionStorageToken }));
  }, []);
};

export const ApiFetcher = ({ query, children, loading }: FetcherProps) => {
  const { isLoading, isError, error, data } = query;

  if (isLoading) return loading;
  if (isError) {
    console.log(error);
    return <Body1>Api 통신 에러!</Body1>;
  }

  // 호출 시 data 값을 children으로 전달
  return children(data);
};
