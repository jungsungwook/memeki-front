import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pageController: any = createApi({
  reducerPath: 'pageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.memeki.kr/' }),

  endpoints: (builder) => ({
    searchBox: builder.query({
      query: ({ accessToken, queryUrl }) => {
        return {
          url: queryUrl,
          method: 'get',
          headers: { Authorization: `Bearer ${accessToken}` },
        };
      },
    }),
    pagePost: builder.mutation({
      query: ({ accessToken, page, pageText }) => ({
        url: 'page',
        method: 'post',
        body: { page, pageText },
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
    getDetail: builder.query({
      query: ({ accessToken, id }) => {
        return {
          url: `page/${id}/detail`,
          method: 'get',
          headers: { Authorization: `Bearer ${accessToken}` },
        };
      },
    }),
    like: builder.mutation({
      query: ({ accessToken, id }) => {
        return {
          url: `page/like/${id}`,
          method: 'post',
          headers: { Authorization: `Bearer ${accessToken}` },
        };
      },
    }),
  }),
});

export const {
  useSearchBoxQuery,
  usePagePostMutation,
  useGetDetailQuery,
  useLikeMutation,
} = pageController;

export default pageController;
