const CandidateView = ({ data }: CandidateViewProps) => {
  return (
    <div className="flex flex-col gap-3 bg-gray-200 p-4 sm:p-6 rounded-xl shadow-md">
      <div>
        <strong className="mr-2">Name:</strong>
        <span>{data.name}</span>
      </div>
      <div>
        <strong className="mr-2">Agreed to terms:</strong>
        <span>{data.agreedToTerms ? "Yes" : "No"}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <strong>Sectors:</strong>
        <div className="flex flex-wrap gap-2">
          {data.sectors.map((sector) => (
            <span
              key={sector._id}
              className="text-white text-sm sm:text-base bg-gray-600 rounded-full py-1 px-3"
            >
              {sector.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateView;
