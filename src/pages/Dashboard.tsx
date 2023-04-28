import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Dashboard = () => {

  const { user, setUser, workouts, getUserWorkouts } = useContext(LoadingContext) || { getUserWorkouts: () => {} };

  useEffect(() => {
    if (user) {
      getUserWorkouts();
    }
  }, [user]);  


  const handleDelete = (workoutId: string) => {
    console.log('Workout ID:', workoutId)
    axios.delete(`${baseUrl}/workouts/delete/${workoutId}`)
      .then(() => {
        console.log('deleted')
        getUserWorkouts();
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
          <button className="dlt-btn" onClick={()=>handleDelete(workout._id)}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard