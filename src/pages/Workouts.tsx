import { Link } from "react-router-dom"

const Workouts = () => {
  return (
    <div>
      <h3>Workouts</h3>
      <Link to={'/create-workout'}>Create A Workout</Link>
    </div>
  )
}

export default Workouts