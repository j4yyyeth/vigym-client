import { useState, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import axios from "axios";
import { post } from "../services/authService";
import { baseUrl } from "../services/baseUrl";
import ExerciseInput from "../components/ExerciseInput";
import LineChart from "../components/LineChart";

const Dashboard = () => {

  const { user, workouts, getUserWorkouts, updateWorkout } = useContext(LoadingContext) || { getUserWorkouts: () => {} };
  const [updatedWorkouts, setUpdatedWorkouts] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getUserWorkouts();
    }
  }, [user]);  


  const handleDelete = (workoutId: string) => {
    axios.delete(`${baseUrl}/workouts/delete/${workoutId}`)
      .then(() => {
        getUserWorkouts();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleEdit = (workoutId: any) => {
    const workoutToUpdate = updatedWorkouts.find((e) => e._id === workoutId);
    axios
      .put(`${baseUrl}/workouts/edit/${workoutId}`, { workout: workoutToUpdate })
      .then((response) => {
        const updatedWorkout = response.data.updatedWorkout;
        updateWorkout?.(updatedWorkout);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div>
      <h3>My Dashboard</h3>
      {
        workouts?.map((workout, i) => (
          <div className="all-workouts" key={i}>
            <h4>Workout {i + 1}</h4>
            <br></br>
            {workout.exercises.map((exercise, j) => (
              <ExerciseInput
                key={j}
                exercise={exercise.exercise}
                sets={exercise.sets}
                reps={exercise.reps}
                weight={exercise.weight}
                onInputChange={(field, value) => {
                  const newWorkouts = [...updatedWorkouts];
                  if (!newWorkouts[i]) {
                    newWorkouts[i] = { ...workout };
                  }
                  newWorkouts[i].exercises[j] = {
                    ...newWorkouts[i].exercises[j],
                    [field]: value,
                  };
                  setUpdatedWorkouts(newWorkouts);
                }}
              />
            ))}
            <button className="dlt-btn" onClick={()=>handleDelete(workout._id)}>Delete</button>
            <button className="edit-btn" onClick={() => { console.log('Workout ID:', workout._id); handleEdit(workout._id) }}>Save</button>
          </div>
        ))
      }
      <LineChart />
    </div>
  )
  
}

export default Dashboard