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
  }),
});

export const { useImageUploadMutation } = imageController;

export default imageController;
