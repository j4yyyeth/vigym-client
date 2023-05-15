import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const { logout } = useContext(AuthContext) ?? {};

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ color, setColor ] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navCase = () => {
    setDropdownVisible(false);
    setIsMobileMenuOpen(false);
  }

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

  const changeColor = () => {
    if (window.scrollY >= 40) {
        setColor(true);
    }
    else {
        setColor(false);
    }
  }

  window.addEventListener('scroll', changeColor)

  return (
    <nav className={`flex flex-col lg:flex-row ${color ? 'nav-color' : 'no-color'} bg-white text-custom-blue min-h-[60px] lg:min-h-0`}>
      <div className="container mx-auto flex gap-24 items-center py-2">
        <button
          className="lg:hidden text-4xl m-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu/>}
        </button>
        <div className={`flex-grow flex flex-col lg:flex-row justify-center lg:justify-between items-center ${isMobileMenuOpen ? "block" : "hidden"} lg:flex`}>
          <div className={`flex flex-col lg:flex-row items-center space-x-0 lg:space-x-6 ${isMobileMenuOpen ? "justify-center" : ""}`}>
            <div className='logo-txt'>
              <Link onClick={() => setIsMobileMenuOpen(false)} to={'/'}><img id='logo-img' src='/vigym.png' alt='logo' /></Link>
              {!isMobileMenuOpen && <Link onClick={() => setIsMobileMenuOpen(false)} to={'/'}>iGym</Link>}
            </div>
            <Link onClick={() => setIsMobileMenuOpen(false)} className='decoration' to={'/exercises'}>Exercises</Link>
            <div className="relative" ref={dropdownRef}>
              <span className="cursor-pointer decoration" onClick={toggleDropdown}>Workouts</span>
              {dropdownVisible && (
                <div className="absolute text-center mt-2 space-y-2 bg-white bg-opacity-70 text-blue-500 rounded shadow-md z-10">
                  <Link to="/workouts" className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={() => navCase()}>View</Link>
                  <Link to="/create-workout" className="block px-4 py-2 hover:bg-blue-500 hover:text-white" onClick={() => navCase()}>Create</Link>
                </div>
              )}
            </div>
            {getToken() && (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} className='decoration' to={'/dashboard'}>Dashboard</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className='decoration' to={'/trainer'}>AI Trainer</Link>
              </>
            )}
            <Link onClick={() => setIsMobileMenuOpen(false)} className='decoration' to={'/store'}>Store</Link>
          </div>
          <div className={`flex flex-col lg:flex-row items-center space-x-0 lg:space-x-6 ${isMobileMenuOpen ? "justify-center" : ""}`}>
            {!getToken() ? (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} className='decoration' to={'/login'}>Sign In</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to={'/signup'} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md">Get Started</Link>
              </>
              ) : (
              <button onClick={logout} className="px-4 py-1 rounded decoration">Logout</button>
            )}
          </div>
      </div>
    </div>
  </nav>
); 

  
};

export default Navbar;