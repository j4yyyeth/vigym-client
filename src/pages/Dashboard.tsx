import { useState, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import ExerciseInput from "../components/ExerciseInput";
import CardioInput from "../components/CardioInput";
import BarChart from "../components/BarChart";
import Calendar from "../components/Calendar";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const { user, workouts, getUserWorkouts, updateWorkout, getUserSchedule } = useContext(LoadingContext) || { getUserWorkouts: () => {} };
  const [updatedWorkouts, setUpdatedWorkouts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      getUserWorkouts();
      getUserSchedule?.();
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
  };

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
    <div className="bg-gradient-to-r from-custom-g-blue-1 via-custom-g-blue-2 to-custom-g-blue-1 min-h-screen pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts?.map((workout, i) => (
            <div className="bg-white shadow-md rounded-lg p-4" key={i}>
              <h4 className="text-xl font-bold mb-2">Workout {i + 1}</h4>
              <hr className="mb-4" />
              {workout.exercises.map((exercise, j) => (
                <ExerciseInput
                  key={j}
                  exercise={exercise.exercise}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  weight={exercise.weight}
                  onInputChange={(field, value) => {
                    const workoutIndex = updatedWorkouts.findIndex(w => w._id === workout._id);
                    const newWorkouts = [...updatedWorkouts];

                    if (workoutIndex === -1) {
                      newWorkouts.push({ ...workout });
                    }

                    const targetWorkout = newWorkouts[workoutIndex !== -1 ? workoutIndex : newWorkouts.length - 1];
                    targetWorkout.exercises[j] = {...targetWorkout.exercises[j],[field]: value};

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
                  const workoutIndex = updatedWorkouts.findIndex(w => w._id === workout._id);
                  const newWorkouts = [...updatedWorkouts];

                  if (workoutIndex === -1) {
                    newWorkouts.push({ ...workout });
                  }

                  const targetWorkout = newWorkouts[workoutIndex !== -1 ? workoutIndex : newWorkouts.length - 1];
                  targetWorkout.cardio = {...targetWorkout.cardio,[field]: value};

                  setUpdatedWorkouts(newWorkouts);
                }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gradient-to-r from-custom-red-1 via-custom-red-2 to-custom-red-1 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleDelete(workout._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleEditToggle(workout._id)}
                >
                  {isEditing[workout._id] ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {workouts && workouts.length > 0 ? (
          <>
            <div className="bg-white shadow-md rounded-lg flex-column justify-center mt-8">
              <BarChart />
            </div>
            <div className="flex justify-center">
              <Calendar workouts={workouts} user={user} userSchedule={getUserSchedule} />
            </div>
          </>
          ) : <Link className="bg-white shadow-md rounded-md p-4 text-blue-500 px-4 py-2 text-center" to='/create-workout'>Create a workout</Link>
        }
      </div>
    </div>
  );
};

export default Dashboard;