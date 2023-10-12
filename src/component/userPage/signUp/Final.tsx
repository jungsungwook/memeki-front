import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  SignUpLevel,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Header1, Section } from '../../emotion/GlobalStyle';

const Final = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  const onsubmitHandler = (data: any) => {
    const formData = {
      customId: data.customId,
      name: data.name,
      email: data.email,
      password: data.password,
    };

    console.log(formData);
    navigate('/');
  };
  return (
    <ModalPage>
      <Header1>회원가입 정보 입력</Header1>

      <SignUpLevel />

      <form onSubmit={handleSubmit(onsubmitHandler)}>
        <Section gap="4">
          <LoginInputList>
            <LoginInput
              type="user"
              placeholder="아이디"
              check
              errMsg={errors.customId ? errors.customId.message : undefined}
              register={register('customId', {
                required: '아이디를 입력하세요.',
                maxLength: {
                  value: 20,
                  message: '아이디는 20자 이하여야 합니다.',
                },
                minLength: {
                  value: 3,
                  message: '아이디는 3자 이상이여야 합니다.',
                },
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: '아이디는 영문자와 숫자만을 허용합니다.',
                },
              })}
            />
            <Line />
            <LoginInput
              type="password"
              placeholder="비밀번호"
              errMsg={errors.password ? errors.password.message : undefined}
              register={register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이여야 합니다.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                  message:
                    '비밀번호는 영문, 숫자, 특수문자 중 3종류 이상을 조합해야 합니다.',
                },
              })}
            />
            <Line />
            <LoginInput
              type="password"
              placeholder="비밀번호 확인"
              errMsg={
                errors.passwordConfirm
                  ? errors.passwordConfirm.message
                  : undefined
              }
              register={register('passwordConfirm', {
                required: '비밀번호를 입력하세요.',
                validate: {
                  check: (value) =>
                    value === getValues('password') ||
                    '비밀번호가 일치하지 않습니다.',
                },
              })}
            />
          </LoginInputList>

          <LoginInputList>
            <LoginInput
              type="user"
              placeholder="닉네임"
              check
              errMsg={errors.name ? errors.name.message : undefined}
              register={register('name', {
                required: '닉네임을 입력하세요.',
                maxLength: {
                  value: 10,
                  message: '닉네임은 10자 이하여야 합니다.',
                },
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
                  value: /^\S+@\S+$/i,
                  message: '올바른 이메일 주소를 입력하세요.',
                },
              })}
            />
          </LoginInputList>

          <ButtonBox submit type="long">
            회원가입
          </ButtonBox>
        </Section>
      </form>
    </ModalPage>
  );
};

export default Final;
