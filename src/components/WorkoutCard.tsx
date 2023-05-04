import { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

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
          </div>
        ))
      }
      </>
  )
}

export default WorkoutCard