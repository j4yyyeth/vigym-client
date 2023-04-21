import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";
import logo from '../vigym.png';
import userImg from '../user.png';

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
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/signup'}><img id='user-img' src={userImg} alt='Sign In' /></Link>
      {
        getToken() 
        ? <button onClick={logout}>Logout</button>
        : <></>
      }
    </nav>
  )
}

export default Navbar;
