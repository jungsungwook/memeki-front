import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { CheckBox, ModalPage, SignUpLevel } from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import {
  Body1Bold,
  Body2,
  Body3,
  Header1,
  Section,
} from '../../emotion/GlobalStyle';
import theme from '../../../styles/theme';

// todo. 전체보기 버튼 구현
const Login = () => {
  const navigate = useNavigate();
  const [allCheck, setAllCheck] = useState(false);
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  const NextButton = () => {
    if (allCheck) navigate('/login/signUp/final');
    else if (!allCheck) alert('회원가입을 완료하려면 동의를 모두 체크해주세요');
  };

  const HandleAllCheckClick = () => {
    setAllCheck(!allCheck);
    if (!allCheck) {
      setFirstCheck(true);
      setSecondCheck(true);
    } else {
      setFirstCheck(false);
      setSecondCheck(false);
    }
  };
  const HandleFirstCheckClick = () => {
    setFirstCheck(!firstCheck);
  };
  const HandleSecondCheckClick = () => {
    setSecondCheck(!secondCheck);
  };
  useEffect(() => {
    if (firstCheck && secondCheck) setAllCheck(true);
    if (!(firstCheck && secondCheck)) setAllCheck(false);
  }, [firstCheck, secondCheck]);
  return (
    <ModalPage>
      <Header1>이용 약관 및 정보수집 동의</Header1>
      <SignUpLevel first />
      <Section gap="1.6">
        <Body1Bold>
          Memeki
          <br />
          서비스 약관에 동의해 주세요.
        </Body1Bold>
        <CheckBox textColumn check={allCheck} onClick={HandleAllCheckClick}>
          <Body2>모두 동의합니다.</Body2>
          <Body3
            style={css`
              color: ${theme.palette.gray[300]};
            `}
          >
            전체 동의는 모든 동의가 포함되어 있으며, <br />
            개별적으로도 동의하실 수 있습니다.
          </Body3>
        </CheckBox>
        <Line bold />
        <CheckBox check={firstCheck} onClick={HandleFirstCheckClick}>
          <Body2>[필수] 미미키 계정 약관</Body2>
          <ButtonBox type="verySmall">전체보기</ButtonBox>
        </CheckBox>
        <CheckBox check={secondCheck} onClick={HandleSecondCheckClick}>
          <Body2>[필수] 개인정보 수집 및 이용 동의</Body2>
          <ButtonBox type="verySmall">전체보기</ButtonBox>
        </CheckBox>
      </Section>

      <ButtonBox type="long" onClick={NextButton}>
        다음
      </ButtonBox>
    </ModalPage>
  );
};

export default Login;
