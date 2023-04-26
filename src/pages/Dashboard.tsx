import { useState, useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import { baseUrl } from '../services/baseUrl';

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

const Dashboard = () => {

  const { user } = useContext(LoadingContext) || {};
  const [ workouts, setWorkouts ] = useState<Workout[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUserWorkouts = async () => {
      try {
        const response = await fetch(`${baseUrl}/workouts/user/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.log("Error");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserWorkouts();
  }, [user]);

  return (
    <div>
      <h3>My Dashboard</h3>
      {
        workouts.map((workout, i) => (
          <div key={i}>
            {workout.exercises.map((exercise, i) => (
              <div key={i}>
                <h4>Workout</h4>
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

export default Dashboard