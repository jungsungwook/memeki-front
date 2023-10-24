import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Header1, Section } from '../../emotion/GlobalStyle';
import { useFindPasswordMutation } from '../../../store/controller/userAuthController';

interface FormValue {
  customId: string;
  email: string;
}

const FindPw = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });
  const [findPasswordData] = useFindPasswordMutation();

  const onsubmitHandler: SubmitHandler<FormValue> = async (formData) => {
    try {
      const response = await findPasswordData(formData);
      console.log('response: ', response);
      if (response.data.statusCode === '200') {
        alert(response.data.contents);
        navigate('/login');
      }
    } catch (err: any) {
      alert('가입 정보가 없습니다.');
      // console.log('error: ', err);
    }
  };
  return (
    <ModalPage>
      <Header1>비밀번호 찾기</Header1>

      <form onSubmit={handleSubmit(onsubmitHandler)}>
        <Section gap="4">
          <LoginInputList>
            <LoginInput
              type="user"
              placeholder="아이디"
              errMsg={errors.customId ? errors.customId.message : undefined}
              register={register('customId', {
                required: '아이디를 입력하세요.',
              })}
            />
            <Line />
            <LoginInput
              type="email"
              placeholder="이메일"
              errMsg={errors.email ? errors.email.message : undefined}
              register={register('email', {
                required: '이메일 주소를 입력하세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 주소를 입력하세요.',
                },
              })}
            />
          </LoginInputList>

          <ButtonBox submit type="long">
            이메일 전송
          </ButtonBox>
        </Section>
      </form>

      <TextButtonList>
        <TextButton type="id" />
        <TextButton type="login" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default FindPw;
