import { useState, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { baseUrl } from '../services/baseUrl';
import { useNavigate } from "react-router-dom";

interface Exercise {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
}

const CreateWorkouts = () => {

  const navigate = useNavigate();

  const {  user } = useContext(LoadingContext) || {};

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [tempExercise, setTempExercise] = useState<Exercise>({ exercise: '', sets: 0, reps: 0, weight: 0 });
  const [cardio, setCardio] = useState({ type: "", time: 0 });
  const [hasExercises, setHasExercises] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
    setTempExercise({ ...tempExercise, [e.target.name]: value });
  };    

  const addExercise = () => {
    if (tempExercise.exercise.trim() !== '') {
      setExercises([...exercises, tempExercise]);
      setTempExercise({ exercise: '', sets: 0, reps: 0, weight: 0 });
      setHasExercises(true);
    }
  };    

  const submitWorkout = async () => {
    if (!user || !hasExercises) {
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/workouts/create/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercises, cardio }),
      });
      
      if (response.ok) {
        navigate("/dashboard");
      } else {
          console.log("Error");
        }
    } catch (err) {
        console.log(err);
      }
  };

  const submitDisabled = exercises.length === 0;

  return (
    <div className="bg-gradient-to-r from-custom-g-blue-1 via-custom-g-blue-2 to-custom-g-blue-1 min-h-screen pt-16">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <label className="text-blue-500">Exercise</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="text"
              name="exercise"
              value={tempExercise.exercise}
              onChange={handleChange}
              placeholder="Exercise"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label>Sets</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="number"
                name="sets"
                value={tempExercise.sets}
                onChange={handleChange}
                placeholder="Sets"
              />
            </div>
            <div>
              <label>Reps</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="number"
                name="reps"
                value={tempExercise.reps}
                onChange={handleChange}
                placeholder="Reps"
              />
            </div>
            <div>
              <label>Weight (lbs)</label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full"
                type="number"
                name="weight"
                value={tempExercise.weight}
                onChange={handleChange}
                placeholder="Weight"
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={addExercise}
          >
            Add Exercise
          </button>
          <div className="mb-4">
            <label className="text-blue-500">Cardio</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="text"
              name="type"
              value={cardio.type}
              onChange={(e) => setCardio({ ...cardio, [e.target.name]: e.target.value })}
              placeholder="Cardio"
            />
          </div>
          <div className="mb-4">
            <label>Time (minutes)</label>
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="number"
              name="time"
              value={cardio.time}
              onChange={(e) => setCardio({...cardio, [e.target.name]: parseInt(e.target.value, 10)})}
              placeholder="Cardio Time"
            />
          </div>
        </div>
        <div className="mt-8">
          {exercises.map((exercise, index) => (
            <div className="bg-white shadow-md rounded-lg p-4 mb-4" key={index}>
              <h3 className="text-xl font-bold mb-2">{exercise.exercise}</h3>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Weight: {exercise.weight}</p>
            </div>
          ))}
          {cardio.type ? (
            <h3 className="text-xl font-bold text-gray-100">Cardio: {cardio.type}</h3>
            ) : (
            <h3 className="text-xl font-bold text-gray-100">Cardio: None</h3>
          )}
          {cardio.time ? (
            <h5 className="text-lg font-semibold text-gray-100">{cardio.time} min</h5>
            ) : (
            <></>
          )}
          <br></br>
          <h3 className="text-xl font-bold text-gray-100">{exercises.length} Exercises</h3>
        </div>
        <br></br>
        <br></br>
        {
          exercises.length ? 
          <button
          className="bg-white shadow-md rounded-lg p-4 text-blue-500 px-4 py-2 mb-5"
          onClick={submitWorkout}
          disabled={submitDisabled}
          >
            Create Workout
          </button> : <></>
        }
      </div>
    </div>
  );
};
  
export default CreateWorkouts;