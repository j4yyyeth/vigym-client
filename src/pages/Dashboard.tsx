import { useState, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import { baseUrl } from '../services/baseUrl';
import { get, post } from "../services/authService";

const Dashboard = () => {

  const { user, workouts, getUserWorkouts } = useContext(LoadingContext) || { getUserWorkouts: () => {} };

  useEffect(() => {
    if (user) {
      getUserWorkouts();
    }
  }, [user]);  


  // const handleDelete = async () => {
  //   try {
  //     const response = await get(`${baseUrl}/workouts/delete/${user._id}`)
  //   }
  // }

  return (
    <div>
      <h3>My Dashboard</h3>
      {
        workouts?.map((workout, i) => (
          <div className="all-workouts" key={i}>
            <h4>Workout {i + 1}</h4>
            <br></br>
            {workout.exercises.map((exercise, j) => (
            <div key={j}>
              <h5>{exercise.exercise}</h5>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Weight: {exercise.weight}</p>
              <br></br>
            </div>
          ))}
          <button className="dlt-btn">Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard