import { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Link } from "react-router-dom";

const WorkoutCard = () => {
  const { allWorkouts, getAllWorkouts } =
    useContext(LoadingContext) || { getAllWorkouts: () => {} };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  return (
    <div className="container mx-auto px-4 md:w-1/2">
      {allWorkouts?.map((workout, i) => (
        <div
          className="workout-card bg-white rounded-lg shadow-md p-4 mb-4"
          key={i}
        >
          {workout.exercises.map((exercise, j) => (
            <div key={j} className="mb-2">
              <h5 className="font-bold">{exercise.exercise}</h5>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
            </div>
          ))}
          {workout.cardio.type.length ? (
            <div>
              <h5 className="font-bold">Cardio: {workout.cardio.type}</h5>
              <p>Time: {workout.cardio.time} min</p>
            </div>
          ) : null}
          <div className="mt-4 flex justify-end">
            <Link
              to={`/comments/${workout._id}`}
              className="text-blue-500 hover:text-blue-600 font-bold px-4 py-2 rounded"
            >
              Comment
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutCard;
