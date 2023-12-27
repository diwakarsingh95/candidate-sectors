import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/index";

const Header = () => {
  const { id } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <header className="bg-gray-200 shadow-md fixed w-full top-0 z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-[2px]">
            <span className="text-slate-500">Candidate</span>
            <span className="text-slate-700">Sectors</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <li className="text-slate-700 hover:underline">
            {id && pathname.indexOf("candidate") === -1 && (
              <Link to={`/candidate/${id}`}>Your Data</Link>
            )}
            {pathname !== "/" && <Link to="/">Home</Link>}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
