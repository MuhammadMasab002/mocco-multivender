import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const baseUrl = import.meta.env.BACKEND_API_URL;

export const MoccoMartApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    // credentials: "include",
    // prepareHeaders: (headers) => headers,
  }),
  // tagTypes: ["Category", "SubCategory", "Product"],
  endpoints: (builder) => ({
    // dummy endpoint to test the api
    getDummy: builder.query({
      query: () => "/dummy",
    }),
  }),
});

export const { useGetDummyQuery } = MoccoMartApi;
