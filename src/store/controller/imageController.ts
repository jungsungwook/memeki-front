import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageController: any = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.memeki.kr/image/' }),

  endpoints: (builder) => ({
    imageUpload: builder.mutation({
      query: ({ accessToken, fileData }) => {
        const formData = new FormData();
        formData.append('files', fileData);
        return {
          url: 'upload',
          method: 'post',
          body: formData,
          headers: { Authorization: `Bearer ${accessToken}` },
        };
      },
    }),
    // SignIn: builder.mutation({
    //   query: (formData) => ({
    //     url: 'signin',
    //     method: 'post',
    //     body: formData,
    //     // axios: {
    //     //   withCredentials: true,
    //     // },
    //   }),
    // }),
    // FindId: builder.mutation({
    //   query: (data) => ({
    //     url: 'find-id',
    //     method: 'post',
    //     body: data,
    //   }),
    // }),
    // FindPassword: builder.mutation({
    //   query: (formData) => ({
    //     url: 'find-password',
    //     method: 'post',
    //     body: formData,
    //   }),
    // }),
    // SignOut: builder.query({
    //   query: ({ accessToken }) => ({
    //     url: 'signout',
    //     method: 'get',
    //     headers: { Authorization: accessToken },
    //     // axios: {
    //     //   withCredentials: true,
    //     // },
    //   }),
    // }),
  }),
});

export const { useImageUploadMutation } = imageController;

export default imageController;
