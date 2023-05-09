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
    <>
      {allWorkouts?.map((workout, i) => (
        <div
          className="all-workouts bg-white rounded-lg shadow-md p-4 mb-4"
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
            <>
              <h2 className="font-bold">Cardio: {workout.cardio.type}</h2>
              <h5>Time: {workout.cardio.time} min</h5>
            </>
          ) : (
            <></>
          )}
          <Link
            to={`/comments/${workout._id}`}
            className="text-blue-500 font-bold hover:text-blue-700"
          >
            Comment
          </Link>
        </div>
      ))}
    </>
  );
};

export default WorkoutCard;
