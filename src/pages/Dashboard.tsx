import { useState, useContext, useEffect, useCallback } from "react";
import { LoadingContext } from "../context/loadingContext";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import ExerciseInput from "../components/ExerciseInput";
import CardioInput from "../components/CardioInput";
import BarChart from "../components/BarChart";
import Calendar from "../components/Calendar";

const Dashboard = () => {

  const { user, workouts, getUserWorkouts, updateWorkout } = useContext(LoadingContext) || { getUserWorkouts: () => {} };
  const [updatedWorkouts, setUpdatedWorkouts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      getUserWorkouts();
    }
  }, [user]);

  const handleEditToggle = (workoutId: string) => {
    if (isEditing[workoutId]) {
      handleEdit(workoutId);
    }
    setIsEditing({ ...isEditing, [workoutId]: !isEditing[workoutId] });
  };

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
        const newUpdatedWorkouts = updatedWorkouts.filter(workout => workout._id !== workoutId);
        setUpdatedWorkouts(newUpdatedWorkouts);
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
              focusId={`${workout._id}-${j}`}
              focus={isEditing[workout._id]}
              onInputFocus={() => {
                if (!isEditing[workout._id]) {
                  setIsEditing({ ...isEditing, [workout._id]: true });
                }
              }}
            />
            ))}
            <CardioInput 
              type={workout.cardio.type} 
              time={workout.cardio.time}
              onInputChange={(field, value) => {
                const newWorkouts = [...updatedWorkouts];
                if (!newWorkouts[i]) {
                  newWorkouts[i] = { ...workout };
                }
                newWorkouts[i].cardio = {
                  ...newWorkouts[i].cardio, 
                  [field]: value
                };
                setUpdatedWorkouts(newWorkouts);
              }}
            />
              <button className="dlt-btn" onClick={()=>handleDelete(workout._id)}>Delete</button>
              <button className="edit-btn" onClick={() => handleEditToggle(workout._id)}>{isEditing[workout._id] ? "Save" : "Edit"}</button>
          </div>
        ))
      }
      {
        workouts && workouts.length > 0 ? 
        <div style={{ width: '52%', height: '52%' }}>
          <BarChart />
        </div> 
        : <></>
      }
      <h3>My Calendar</h3>
      <Calendar workouts={workouts} user={user}/>
    </div>
  )
}

export default Dashboard