import { useState } from "react";
import SectorForm from "../../components/SectorForm";
import { MdEditSquare } from "react-icons/md";

const ViewData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = async () => {
    console.log("handleSubmit...");
  };

  return (
    <main className="max-w-3xl container px-6 mt-6 sm:mt-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-center text-2xl font-semibold">Your Data</h1>
        <button
          type="button"
          className="flex items-center gap-1 py-1 px-2 rounded-lg text-sky-600 hover:text-sky-700 focus:outline-sky-500 underline"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit{" "}
          <span>
            <MdEditSquare />
          </span>
        </button>
      </div>
      <SectorForm onSubmit={onSubmit} />
    </main>
  );
};

export default ViewData;
