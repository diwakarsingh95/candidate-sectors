const PageLoadingIndicator = () => {
  return (
    <div className="max-w-3xl container px-6 mx-auto h-[calc(100vh-120px)]">
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-3xl flex gap-2 items-center animate-pulse">
          Loading <span className="text-4xl font-bold">...</span>
        </p>
      </div>
    </div>
  );
};

export default PageLoadingIndicator;
