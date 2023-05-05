import { useState, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { baseUrl } from '../services/baseUrl';
import { useNavigate } from "react-router-dom";
import Workouts from "./Workouts";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value;
        setTempExercise({ ...tempExercise, [e.target.name]: value });
    };    

    const addExercise = () => {
        setExercises([...exercises, tempExercise]);
        setTempExercise({ exercise: '', sets: 0, reps: 0, weight: 0 });
    };

    const submitWorkout = async () => {
        if (!user) {
          console.log("User not available");
          return;
        }
        const url = `${baseUrl}/workouts/create/${user._id}`;
        console.log("Submitting workout to URL:", url);
        try {
          const response = await fetch(`${baseUrl}/workouts/create/${user._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exercises, cardio }),
          });
      
          if (response.ok) {
            const result = await response.json();
            navigate("/dashboard");
            console.log(result);
          } else {
            console.log("Error submitting workout");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };      
    
    return (
            <div>
                <h1>Create Workouts</h1>
                <div>
                    <input
                    type="text"
                    name="exercise"
                    value={tempExercise.exercise}
                    onChange={handleChange}
                    placeholder="Exercise"
                />
                <label>Sets</label>
                <input
                    type="number"
                    name="sets"
                    value={tempExercise.sets}
                    onChange={handleChange}
                    placeholder="Sets"
                />
                <label>Reps</label>
                <input
                    type="number"
                    name="reps"
                    value={tempExercise.reps}
                    onChange={handleChange}
                    placeholder="Reps"
                />
                <label>Weight</label>
                <input
                    type="number"
                    name="weight"
                    value={tempExercise.weight}
                    onChange={handleChange}
                    placeholder="Weight"
                />
                <button onClick={addExercise}>Add Exercise</button>
                <div>
                    <label>Cardio</label>
                    <input
                        type="text"
                        name="type"
                        value={cardio.type}
                        onChange={(e) =>
                        setCardio({ ...cardio, [e.target.name]: e.target.value })
                        }
                        placeholder="Cardio Type"
                    />
                    <label>Cardio Time (minutes)</label>
                    <input
                        type="number"
                        name="time"
                        value={cardio.time}
                        onChange={(e) =>
                        setCardio({ ...cardio, [e.target.name]: parseInt(e.target.value, 10) })
                        }
                        placeholder="Cardio Time"
                    />
                </div>
            </div>
            <div>
                {
                exercises.map((exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.exercise}</h3>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Weight: {exercise.weight}</p>
                        <br></br>
                        <br></br>
                    </div>
                ))
                }
                {
                    cardio.type ? <h3>Cardio: {cardio.type}</h3> : <h3>Cardio: None</h3>
                }
                {
                    cardio.time ? <h5>{cardio.time} min</h5> : <></>
                }
            </div>
            <br></br>
            <br></br>
            <button onClick={submitWorkout}>Submit Workout</button>
        </div>
    );        
  }
  
  export default CreateWorkouts;