import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthController: any = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.memeki.kr/auth/' }),

  endpoints: (builder) => ({
    SignUp: builder.mutation({
      query: (formData) => ({
        url: 'signup',
        method: 'post',
        body: formData,
      }),
    }),
    SignIn: builder.mutation({
      query: (formData) => ({
        url: 'signin',
        method: 'post',
        body: formData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userAuthController;

export default userAuthController;
