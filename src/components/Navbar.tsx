import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { AuthContext } from "../context/authContext";
import logo from '../vigym.png';

const Navbar = () => {

  const getToken = () => {
    return localStorage.getItem('authToken')
  } 

  const { logout } = useContext(AuthContext) ?? {};

  // const { user } = useContext(LoadingContext);

  return (
    <nav>
      <div className='logo-txt'>
        <Link to={'/'}><img id='logo-img' src={logo} alt='logo' /></Link>
        <Link to={'/'}>iGym</Link>
      </div>
      <Link to={'/exercises'}>Exercises</Link>
      <Link to={'/workouts'}>Workouts</Link>
      <Link to={'/store'}>Store</Link>
      {
        getToken() 
        ? 
          <>
            <button onClick={logout}>Logout</button>
            <Link to={'/dashboard'}>Dashboard</Link>
          </>
        : 
          <>
            <Link to={'/login'}>Sign in</Link>
            <Link id='start-action-call'  to={'/signup'}>Get Started</Link>
          </>
      }
    </nav>
  )
}

export default Navbar;
