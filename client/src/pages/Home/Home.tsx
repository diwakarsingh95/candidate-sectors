import SectorForm from "../../components/SectorForm";

const Home = () => {
  const onSubmit = async () => {
    console.log("handleSubmit...");
  };

  return (
    <main className="max-w-3xl container px-6 mt-6 sm:mt-10 mx-auto">
      <h1 className="md:text-center text-xl font-semibold mb-6">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <SectorForm onSubmit={onSubmit} />
    </main>
  );
};

export default Home;
