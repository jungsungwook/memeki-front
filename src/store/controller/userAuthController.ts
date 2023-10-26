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
        axios: {
          withCredentials: true,
        },
      }),
    }),
    FindId: builder.mutation({
      query: (data) => ({
        url: 'find-id',
        method: 'post',
        body: data,
      }),
    }),
    FindPassword: builder.mutation({
      query: (formData) => ({
        url: 'find-password',
        method: 'post',
        body: formData,
      }),
    }),
    SignOut: builder.query({
      query: ({ accessToken }) => ({
        url: 'signout',
        method: 'get',
        headers: { Authorization: accessToken },
        axios: {
          withCredentials: true,
        },
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useFindIdMutation,
  useFindPasswordMutation,
  useSignOutQuery,
} = userAuthController;

export default userAuthController;
