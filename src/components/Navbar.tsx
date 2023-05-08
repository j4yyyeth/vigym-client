import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import logo from '../vigym.png';

const Navbar = () => {

  const getToken = () => {
    return localStorage.getItem('authToken')
  } 

  const { logout } = useContext(AuthContext) ?? {};

  return (
    <nav>
      <div className='logo-txt'>
        <Link to={'/'}><img id='logo-img' src='/vigym.png' alt='logo' /></Link>
        <Link to={'/'}>iGym</Link>
      </div>
      {
        getToken()
        ? <Link to={'/dashboard'}>Dashboard</Link>
        : <></>
      }
      <Link to={'/exercises'}>Exercises</Link>
      <Link to={'/workouts'}>Workouts</Link>
      {
        getToken()
        ? <Link to={'/trainer'}>AI Trainer</Link>
        : <></>
      }
      <Link to={'/store'}>Store</Link>
      {
        getToken() 
        ? 
          <>
            <button onClick={logout}>Logout</button>
          </>
        : 
          <>
            <Link to={'/login'}>Sign In</Link>
            <Link id='start-action-call'  to={'/signup'}>Get Started</Link>
          </>
      }
    </nav>
  )
}

export default Navbar;
