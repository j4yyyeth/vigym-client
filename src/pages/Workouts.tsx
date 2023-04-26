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

interface User {
  _id: string;
  email: string;
  username: string;
  password: string;
  workouts: Workout[];
}


const Workouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchAllWorkouts = async () => {

      try {
        const response = await fetch(`${baseUrl}/workouts/all`);

        if (response.ok) {
          const data = await response.json();
          const allWorkouts = data.map((user: User)=> user.workouts).flat();
          setWorkouts(allWorkouts);
        } else {
          console.log("Error fetching workouts");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchAllWorkouts();
  }, []);

  return (
    <div>
    <h3>Workouts</h3>
    <Link to={"/create-workout"}>Create A Workout</Link>
    <div>
      <br></br>
      {workouts.map((workout, index) => workout.exercises ? (
        <div key={index}>
          <h4>Workout {index + 1}</h4>
          {workout.exercises.map((exercise, i) => (
            <div key={i}>
              <h5>{exercise.exercise}</h5>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
              <p>Weight: {exercise.weight}</p>
            </div>
          ))}
        </div>
      ) : null)}
      <br></br>
    </div>
  </div>
  )
}

export default Workouts