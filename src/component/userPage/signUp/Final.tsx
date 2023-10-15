import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  LoginInput,
  LoginInputList,
  ModalPage,
  SignUpLevel,
} from '../emotion/component';
import { ButtonBox, Line } from '../../emotion/component';
import { Header1, Section } from '../../emotion/GlobalStyle';
import { useSignUpMutation } from '../../../store/controller/userAuthController';

// Todo. 1) error.message alter에 띄우기
// Todo. 2) 400 err 브라우저에 로그 안 남기기(공통 모듈로 만들어서 넣기)
// 2) https://chat.openai.com/share/9f1a0bba-af5c-4c1a-8387-9855f3e9a3be
// 2) https://axios-http.com/kr/docs/handling_errors
const Final = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const customId = watch('customId');
  const name = watch('name');

  useEffect(() => {
    if (customId) {
      setIsId(false);
    } else if (name) {
      setIsName(false);
    }
  }, [customId, name]);

  const [singUpData] = useSignUpMutation();

  const onCheckIdClick = async () => {
    await trigger('customId');
    if (errors.customId || !getValues('customId')) {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.memeki.kr/auth/id-check?id=${getValues('customId')}`,
      );
      if (response.data.statusCode === '200') {
        alert('사용 할 수 있는 아이디입니다.');
        setIsId(true);
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        alert('중복된 아이디가 있습니다.');
        setIsId(false);
      } else {
        console.error('onCheckIdClick error:', error);
      }
    }
  };

  const onCheckNameClick = async () => {
    try {
      await trigger('name');
      if (errors.nameData || !getValues('name')) {
        return;
      }

      const response = await axios.get(
        `https://api.memeki.kr/auth/name-check?name=${getValues('name')}`,
      );

      if (response.data.statusCode === '200') {
        alert('사용 할 수 있는 닉네임입니다.');
        setIsName(true);
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 401) {
        alert('중복된 아이디가 있습니다.');
        setIsName(false);
      } else {
        console.error('onCheckNameClick error:', error);
      }
    }
  };

  const onsubmitHandler = async (submitData: any) => {
    try {
      if (!(isId && isName)) {
        alert('중복확인 버튼을 눌러주세요');
        return;
      }
      const formData = {
        customId: submitData.customId,
        name: submitData.name,
        email: submitData.email,
        password: submitData.password,
      };

      const response = await singUpData(formData);
      if (response.data.statusCode === '200') navigate('/');
      else console.log(response.contents);
    } catch (error) {
      console.log(error);
    }
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
              onClick={onCheckIdClick}
              register={register('customId', {
                required: '아이디를 입력하세요.',
                maxLength: {
                  value: 20,
                  message: '아이디는 20자 이하여야 합니다.',
                },
                minLength: {
                  value: 4,
                  message: '아이디는 4자 이상이여야 합니다.',
                },
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: '아이디는 영문 소문자와 숫자만을 허용합니다.',
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
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W)(?=.*[a-z]).{8,}$/,
                  message:
                    '비밀번호는 대문자, 소문자, 숫자, 특수문자 모두 포함해야 합니다.',
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
              onClick={onCheckNameClick}
              errMsg={errors.name ? errors.name.message : undefined}
              register={register('name', {
                required: '닉네임을 입력하세요.',
                minLength: {
                  value: 2,
                  message: '닉네임은 2자 이상이여야 합니다.',
                },
                maxLength: {
                  value: 10,
                  message: '닉네임은 10자 이하여야 합니다.',
                },
                pattern: {
                  value: /^[A-Za-z가-힣]*$/,
                  message: '닉네임은 영문 대소문자 및 한글 문자만 허용합니다.',
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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 주소를 입력하세요.',
                },
              })}
            />
          </LoginInputList>

          {/* {isLoading ? (
            <ButtonBox submit type="long">
              잠시만 기다려주세요!
            </ButtonBox>
          ) : ( */}
          <ButtonBox submit type="long">
            회원가입
          </ButtonBox>
          {/* )} */}
        </Section>
      </form>
    </ModalPage>
  );
};

export default Final;
