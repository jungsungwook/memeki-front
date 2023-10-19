import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';
import { setUser } from '../store/slice/userSlice';

// 리프레시 실행시간 설정
export const RefreshTokenUtil = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('Refresh')) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.memeki.kr/auth/refresh',
          );
          const { accessToken } = response.data.contents;
          dispatch(setUser({ accessToken }));
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      };

      // 최초 실행
      fetchData();
      // 29분마다 실행
      const interval = setInterval(fetchData, 29 * 60 * 1000);
      // 컴포넌트가 unmount될 때 interval을 정리
      return () => {
        clearInterval(interval);
      };
    }
    return () => {}; // 값을 반환
  }, []);
};
