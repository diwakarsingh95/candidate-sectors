import { Link, useLocation } from "react-router-dom";
import { MdPerson, MdHome } from "react-icons/md";
import { useAppSelector } from "../../hooks/index";

const Header = () => {
  const { id } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  return (
    <header className="bg-gray-200 shadow-md fixed w-full top-0 z-10 h-14">
      <div className="relative flex justify-between items-center max-w-6xl mx-auto p-3 h-full">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-[2px]">
            <span className="text-slate-500">Candidate</span>
            <span className="text-slate-700">Sectors</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <li className="text-slate-700 hover:text-slate-900  text-sm sm:text-base">
            {id && pathname === "/" && (
              <Link to={`/candidate/${id}`} className="flex items-center gap-1">
                Your Data <MdPerson className="h-4 w-4 sm:h-6 sm:w-6" />
              </Link>
            )}
            {pathname !== "/" && (
              <Link to="/" className="flex items-center gap-1">
                Home <MdHome className="h-4 w-4 sm:h-6 sm:w-6" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
