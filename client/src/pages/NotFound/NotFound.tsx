import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-3xl container px-6 mx-auto h-[calc(100vh-120px)]">
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-9xl">404</p>
        <p className="text-xl opacity-90 border-t-2 mt-2 py-2">Not found</p>
        <p className="opacity-90 mt-2 py-2">
          Go to{" "}
          <Link
            to="/"
            className="text-slate-900 hover:text-slate-700 font-semibold"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
