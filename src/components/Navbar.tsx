import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const { logout } = useContext(AuthContext) ?? {};

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className='logo-txt'>
            <Link to={'/'}><img id='logo-img' src='/vigym.png' alt='logo' /></Link>
            <Link to={'/'}>iGym</Link>
          </div>
          {getToken() && <Link to={'/dashboard'}>Dashboard</Link>}
          <Link to={'/exercises'}>Exercises</Link>

          <div className="relative" ref={dropdownRef}>
      <span className="cursor-pointer" onClick={toggleDropdown}>Workouts</span>
      {dropdownVisible && (
        <div className="absolute left-0 mt-2 space-y-2 bg-white text-blue-500 rounded shadow-md z-10">
          <Link to="/workouts" className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={() => setDropdownVisible(false)}>View</Link>
          <Link to="/create-workout" className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={() => setDropdownVisible(false)}>Create</Link>
        </div>
      )}
    </div>

          {getToken() && <Link to={'/trainer'}>AI Trainer</Link>}
          <Link to={'/store'}>Store</Link>
          {getToken() && <button onClick={logout} className="px-4 py-1 rounded">Logout</button>}
        </div>
        <div className="flex items-center space-x-4">
          {!getToken() && (
            <>
              <Link to={'/login'}>Sign In</Link>
              <Link id='start-action-call' to={'/signup'} className="bg-white hover:bg-gray-100 text-blue-500 px-4 py-1 rounded">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
