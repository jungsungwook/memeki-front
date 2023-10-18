import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoContainer } from '../emotion/component';

const Success = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  return (
    <InfoContainer
      yellowText={`Welcome!\n회원가입에 성공하였습니다 !`}
      btnText="로그인 페이지로 이동하기"
      onClick={handleClick}
    >
      가입해 주셔서 진심으로 환영합니다! <br />
      가입하신 이메일 주소로 인증 메일을 발송해드렸습니다. <br />
      인증이 완료되면 저희 서비스를 정상적으로 이용하실 수 있으니 꼭
      인증해주시길 부탁드립니다. <br />
      이메일을 잘못 입력하였거나 이메일을 받지 못하셨다면 로그인 후
      마이페이지에서 확인 부탁 드리겠습니다. <br />
      감사합니다 !
    </InfoContainer>
  );
};

export default Success;
