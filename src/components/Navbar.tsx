import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading.context";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {

  const getToken = () => {
    return localStorage.getItem('authToken')
  } 

  // const { logout } = useContext(AuthContext);

  // const { user } = useContext(LoadingContext);

  return (
    <nav>
        <div className='logo-txt'>
        <Link to={'/'}><img id='logo-img' src={require('../vigym.png')} alt='logo' /></Link>
        <Link to={'/'}>iGym</Link>
      </div>
      <Link to={'/exercises'}>Exercises</Link>
      <Link to={'/workouts'}>Workouts</Link>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/signup'}>Signup</Link>
      <Link to={'/login'}>Login</Link>
      {
        getToken() ?
        <><h1>TOKEN</h1></>
        : <><h1>NO TOKEN</h1></>
      }
    </nav>
  )
}

export default Navbar;
