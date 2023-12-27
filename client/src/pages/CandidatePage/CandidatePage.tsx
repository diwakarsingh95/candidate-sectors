import { useParams, useSearchParams } from "react-router-dom";
import { MdArrowBack, MdEditSquare } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import SectorForm from "../../components/SectorForm";
import CandidateData from "../../components/CandidateData";
import {
  useGetCandidateQuery,
  useUpdateCandidateMutation,
} from "../../redux/api/apiSlice";
import { getErrorMessage } from "../../utils/helpers";

const CandidatePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditing = searchParams.get("edit");
  const { id } = useParams();
  const { data, isLoading } = useGetCandidateQuery(id as string, {
    skip: !id,
  });
  const [updateCandidate, { isLoading: isSubmitting, error: submitError }] =
    useUpdateCandidateMutation();

  const onSubmit = async (data: CandidateFormData) => {
    try {
      const response = await updateCandidate(data);
      if (!("error" in response)) {
        setSearchParams({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    if (isEditing) setSearchParams({});
    else setSearchParams({ edit: "true" });
  };

  return (
    <div className="max-w-3xl container px-6 pt-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-center text-2xl font-semibold">Your Data</h1>
        {!isLoading && data ? (
          <button
            type="button"
            className="flex items-center gap-1 py-1 px-2 rounded-lg text-sky-600 hover:text-sky-700 focus:outline-sky-500 underline"
            onClick={handleEdit}
          >
            {isEditing ? (
              <>
                <span>
                  <MdArrowBack />
                </span>
                Back
              </>
            ) : (
              <>
                Edit{" "}
                <span>
                  <MdEditSquare />
                </span>
              </>
            )}
          </button>
        ) : null}
      </div>
      {data && data.data ? (
        isEditing ? (
          <SectorForm
            candidateData={data.data}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CandidateData data={data.data} />
        )
      ) : isLoading ? (
        <div className="flex justify-center">
          <span className="mr-2 text-xl">Loading </span>
          <span>
            <CgSpinner className="animate-spin h-8 w-8" />
          </span>
        </div>
      ) : (
        <p className="text-xl text-gray-600 text-center">No Data</p>
      )}
      {submitError && (
        <p className="text-red-500 text-xl mt-4">
          {getErrorMessage(submitError)}
        </p>
      )}
    </div>
  );
};

export default CandidatePage;
