import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  TextButton,
  TextButtonList,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Section } from '../../emotion/GlobalStyle';
import { useSignInMutation } from '../../../store/controller/userAuthController';
import { setUser } from '../../../store/slice/userSlice';

interface FormValue {
  customId: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });
  const [loginData] = useSignInMutation();

  const onsubmitHandler: SubmitHandler<FormValue> = async (formData) => {
    try {
      const response = await loginData(formData);
      console.log('response: ', response);
      if (response.data.statusCode === '200') {
        const accessToken = response.data.contents;
        // console.log('accessToken: ', accessToken);
        dispatch(setUser({ accessToken }));
        sessionStorage.setItem('token', accessToken);
        navigate('/');
      }
    } catch (error) {
      alert(
        `아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.`,
      );
      // console.log(error);
    }
  };

  return (
    <ModalPage>
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
              type="password"
              placeholder="비밀번호"
              errMsg={errors.password ? errors.password.message : undefined}
              register={register('password', {
                required: '비밀번호를 입력하세요.',
              })}
            />
          </LoginInputList>

          <ButtonBox submit type="long">
            로그인
          </ButtonBox>
        </Section>
      </form>

      <TextButtonList>
        <TextButton type="pw" />
        <TextButton type="id" />
        <TextButton type="signUp" noLine />
      </TextButtonList>
    </ModalPage>
  );
};

export default Login;
