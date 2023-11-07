import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pageController: any = createApi({
  reducerPath: 'imageApi',
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

export const { useSearchBoxQuery } = pageController;

export default pageController;
