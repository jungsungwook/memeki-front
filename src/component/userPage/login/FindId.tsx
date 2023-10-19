import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox } from '../../emotion/component';
import { Header1, Section } from '../../emotion/GlobalStyle';
import { useFindIdMutation } from '../../../store/controller/userAuthController';

interface FormValue {
  email: string;
}

const FindId = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });
  const [findIdData] = useFindIdMutation();

  const onsubmitHandler: SubmitHandler<FormValue> = async (formData) => {
    try {
      const response = await findIdData(formData);
      // console.log('response: ', response);
      if (response.data.statusCode === '200') {
        alert(response.data.contents);
        navigate('/login');
      }
    } catch (err: any) {
      alert('가입 정보가 없습니다.');
      console.log('error: ', err);
    }
  };

  return (
    <ModalPage>
      <Header1>아이디 찾기</Header1>

      <form onSubmit={handleSubmit(onsubmitHandler)}>
        <Section gap="4">
          <LoginInputList>
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
          <ButtonBox type="long" submit>
            이메일 전송
          </ButtonBox>
        </Section>
      </form>

      <TextButtonList>
        <TextButton type="pw" />
        <TextButton type="login" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default FindId;
