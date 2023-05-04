import { Link } from "react-router-dom";
import WorkoutCard from "../components/WorkoutCard";

const Workouts = () => {
  return (
    <div>
      <Link to={'/create-workout'}>Create a Workout</Link>
      <h3>All Workouts</h3>
      <WorkoutCard />
    </div>
  )
}

export default Workouts