import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/dashboard'}>Dashboard</Link>
      <Link to={'/exercises'}>Exercises</Link>
      <Link to={'/workouts'}>Workouts</Link>
    </div>
  )
}

export default Navbar;
