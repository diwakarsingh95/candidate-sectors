import { useNavigate } from "react-router-dom";
import SectorForm from "../../components/SectorForm";
import { useCreateCandidateMutation } from "../../redux/api/apiSlice";
import { getErrorMessage } from "../../utils/helpers";
import { useAppDispatch } from "../../hooks";
import { updateUser } from "../../redux/user/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createCandidate, { isLoading, error }] = useCreateCandidateMutation();

  const onSubmit = async (data: CandidateFormData) => {
    try {
      const response = await createCandidate(data);
      if (!("error" in response)) {
        dispatch(updateUser(response.data.data._id));
        navigate(`/candidate/${response.data.data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl container px-6 pt-8 mx-auto">
      <h1 className="md:text-center text-xl font-semibold mb-6">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <SectorForm onSubmit={onSubmit} isSubmitting={isLoading} />
      {error && (
        <p className="text-red-500 text-xl mt-4">{getErrorMessage(error)}</p>
      )}
    </div>
  );
};

export default Home;
