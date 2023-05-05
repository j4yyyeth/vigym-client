import { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Link } from "react-router-dom";

const WorkoutCard = () => {

    const { allWorkouts, getAllWorkouts } = useContext(LoadingContext) || { getAllWorkouts: () => {} };

    useEffect(() => {
        getAllWorkouts();
    }, []);  

  return (
    <>
        {
        allWorkouts?.map((workout, i) => (
          <div className="all-workouts" key={i}>
            {workout.exercises.map((exercise, j) => (
            <div key={j}>
              <h5>{exercise.exercise}</h5>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Weight: {exercise.weight}</p>
            </div>
          ))}
            <Link to={`/comments/${workout._id}`}><b>Comment</b></Link>
          </div>
        ))
        }
    </>
  )
}

export default WorkoutCard