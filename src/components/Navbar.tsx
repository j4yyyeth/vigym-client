import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className='logo-txt'>
        <Link to={'/'}><img id='logo-img' src={require('../vigym.png')} alt='logo' /></Link>
        <Link to={'/'}>iGym</Link>
      </div>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/exercises'}>Exercises</Link>
      <Link to={'/workouts'}>Workouts</Link>
    </nav>
  )
}

export default Navbar;
