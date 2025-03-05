import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/accounts/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, { email: string; password: string }>({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
