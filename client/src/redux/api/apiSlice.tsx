import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectorsApi = createApi({
  reducerPath: "sectors",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/sector" }),
  tagTypes: ["Sectors"],
  keepUnusedDataFor: 360,
  invalidationBehavior: "immediately",
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
  invalidationBehavior: "immediately",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCandidate: builder.query<CandidateFormResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Candidate", id }],
    }),
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
    updateCandidate: builder.mutation<CandidateFormResponse, CandidateFormData>(
      {
        query: (body) => ({
          url: `/update`,
          method: "POST",
          body,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          let patchResult;
          try {
            const { data: updatedCandidate } = await queryFulfilled;
            if (updatedCandidate.data) {
              patchResult = dispatch(
                candidateApi.util.updateQueryData(
                  "getCandidate",
                  updatedCandidate.data?._id,
                  (prevData) => {
                    prevData.data = updatedCandidate.data || prevData.data;
                  }
                )
              );
            }
          } catch {
            if (patchResult) patchResult.undo();
          }
        },
      }
    ),
  }),
});

export const { useGetSectorsQuery } = sectorsApi;
export const {
  useCreateCandidateMutation,
  useGetCandidateQuery,
  useUpdateCandidateMutation,
} = candidateApi;
