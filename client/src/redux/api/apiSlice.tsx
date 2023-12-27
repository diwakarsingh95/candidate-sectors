import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectorsApi = createApi({
  reducerPath: "sectors",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/sector" }),
  tagTypes: ["Sectors"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getSectors: builder.query<{ data: Sector[]; message: string }, void>({
      query: () => "",
      providesTags: ["Sectors"],
    }),
  }),
});

export const candidateApi = createApi({
  reducerPath: "candidate",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/candidate" }),
  tagTypes: ["Candidate"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createCandidate: builder.mutation<
      { data: Candidate; message: string },
      CandidateFormData
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetSectorsQuery } = sectorsApi;
export const { useCreateCandidateMutation } = candidateApi;
