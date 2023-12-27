import { useNavigate } from "react-router-dom";
import SectorForm from "../../components/SectorForm";
import { useCreateCandidateMutation } from "../../redux/api/apiSlice";
import { getErrorMessage } from "../../utils/helpers";

const Home = () => {
  const navigate = useNavigate();
  const [createCandidate, { isLoading, error }] = useCreateCandidateMutation();

  const onSubmit = async (data: CandidateFormData) => {
    try {
      const response = await createCandidate(data);
      if (!("error" in response)) {
        navigate("/view", { state: { id: response.data.data._id } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-3xl container px-6 mt-6 sm:mt-10 mx-auto">
      <h1 className="md:text-center text-xl font-semibold mb-6">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <SectorForm onSubmit={onSubmit} isSubmitting={isLoading} />
      {error && (
        <p className="text-red-500 text-xl mt-4">{getErrorMessage(error)}</p>
      )}
    </main>
  );
};

export default Home;
