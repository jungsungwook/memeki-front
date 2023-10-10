import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAuthApi: any = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/auth/' }),

  endpoints: (builder) => ({
    idCheck: builder.query({
      query: (id) => {
        return {
          url: 'id-check',
          params: { id },
        };
      },
    }),
  }),
});

export const { useIdCheckQuery } = userAuthApi;

export default userAuthApi;
