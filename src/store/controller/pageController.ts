import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pageController: any = createApi({
  reducerPath: 'pageApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.memeki.kr/' }),

  endpoints: (builder) => ({
    searchBox: builder.query({
      query: ({ accessToken, pageData }) => {
        if (accessToken) {
          return {
            url: 'page',
            method: 'get',
            query: {
              page: pageData.page,
              limit: pageData.limit,
              search: pageData.search,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
          };
        }
        return {
          url: 'page',
          method: 'get',
          query: {
            page: pageData.page,
            limit: pageData.limit,
            search: pageData.search,
            namespace: pageData.namespace,
          },
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
  }),
});

export const { useSearchBoxQuery, usePagePostMutation } = pageController;

export default pageController;
