import { useState, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import ExerciseInput from "../components/ExerciseInput";
import CardioInput from "../components/CardioInput";
import BarChart from "../components/BarChart";
import Calendar from "../components/Calendar";

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
        console.log(err, "error!");
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
        console.log(err, "EDIT ERROR!");
      });
  };  

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workouts?.map((workout, i) => (
            <div
              className="bg-white shadow-md rounded-lg p-4"
              key={i}
            >
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
                  targetWorkout.exercises[j] = {
                    ...targetWorkout.exercises[j],
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
                const workoutIndex = updatedWorkouts.findIndex(w => w._id === workout._id);
                const newWorkouts = [...updatedWorkouts];

                if (workoutIndex === -1) {
                  newWorkouts.push({ ...workout });
                }

                const targetWorkout = newWorkouts[workoutIndex !== -1 ? workoutIndex : newWorkouts.length - 1];
                targetWorkout.cardio = {
                  ...targetWorkout.cardio,
                  [field]: value,
                };

                setUpdatedWorkouts(newWorkouts);
              }}
            />
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
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
          <div className="mt-8 flex justify-center">
            <BarChart />
          </div>
        ) : (
          <></>
        )}
        <h3 className="text-2xl font-bold my-8 text-center">Schedule</h3>
        <div className="flex justify-center">
          <Calendar workouts={workouts} user={user} userSchedule={getUserSchedule} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;