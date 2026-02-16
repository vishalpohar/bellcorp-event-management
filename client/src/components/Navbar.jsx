import { Search } from "lucide-react";
import { useState } from "react";
import { useEvent } from "../context/EventsContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { user, logout } = useAuth();
  const { filterEvents } = useEvent();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    const search_q = searchInput.trim();
    if (event.key === "Enter") {
      filterEvents({ search_q });
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed bg-white border-b-2 border-gray-300 top-0 left-0 w-full z-50">
      <nav className="px-10 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 py-3">
            <Link
              to="/"
              className="text-gray-700 self-center text-lg lg:text-2xl font-bold font-serif">
              Event Management
            </Link>
            <div className="flex items-center lg:w-[500px]  border-2 border-gray-400 rounded-lg p-1 px-2">
              <input
                className="outline-none flex-1 pr-2"
                type="search"
                value={searchInput}
                placeholder="Search events"
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
              />
              <Search size={18} />
            </div>
            <div className="flex justify-around sm:justify-between items-center gap-5">
              <Link to="/dashboard" className="text-gray-700 font-serif">
                Dashboard
              </Link>
              <div>
                {user ? (
                  <button
                    type="button"
                    className="text-gray-700 font-serif hover:underline"
                    onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 font-serif hover:underline">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
