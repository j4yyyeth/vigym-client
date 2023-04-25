import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
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
  const { user } = useContext(LoadingContext) || {};
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        console.log("User not available");
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/workouts/user/${user._id}`);

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.log("Error fetching workouts");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchWorkouts();
  }, [user]);

  return (
    <div>
    <h3>Workouts</h3>
    <Link to={"/create-workout"}>Create A Workout</Link>
    <div>
      <br></br>
      {workouts.map((workout, index) => (
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
      ))}
      <br></br>
    </div>
  </div>
  )
}

export default Workouts