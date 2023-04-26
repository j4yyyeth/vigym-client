import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../services/baseUrl";

interface Exercise {
  exercise: string,
  sets: number,
  reps: number,
  weight: number
}

interface Workout {
  _id: string;
  exercises: Exercise[];
}


const Workouts = () => {
  const [ workouts, setWorkouts ] = useState<Workout[]>([]);

  useEffect(() => {

    const fetchAllWorkouts = async () => {
      try {
        const response = await fetch(`${baseUrl}/workouts/all`);
        if (response.ok) {
          const data = await response.json();
          console.log("DATA", data);
          setWorkouts(data);
          console.log("WORKOUTS", workouts);
        } else {
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllWorkouts();
  }, []);

  // it's mapping through the exercises

  return (
    <div>
      <h3>All Workouts</h3>
      {
        workouts.map((workout, i) => (
          <div className="all-workouts" key={i}>
            <h4>Workout {i + 1}</h4>
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