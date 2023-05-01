import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../services/baseUrl";
import { LoadingContext } from "../context/loadingContext";

const Workouts = () => {

  const { allWorkouts, setAllWorkouts, getAllWorkouts } = useContext(LoadingContext) || { getAllWorkouts: () => {} };

  useEffect(() => {
      getAllWorkouts();
  }, []);  

  return (
    <div>
      <Link to={'/create-workout'}>Create a Workout</Link>
      <h3>All Workouts</h3>
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
    </div>
  )
}

export default Workouts