import { useEffect, useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Link } from "react-router-dom";

interface WorkoutCardProps {
  filter: string | null;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ filter }) => {
  const { allWorkouts, getAllWorkouts } = useContext(LoadingContext) || { getAllWorkouts: () => {} };

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const filteredWorkouts = allWorkouts?.filter(workout => {
    if (filter === "" || filter == null) {
      return true;
    } else if (filter === "6+") {
      return workout.exercises.length >= 6;
    } else {
      return workout.exercises.length === Number(filter);
    }
  });
  
  return (
    <div className="container mx-auto px-4 md:w-1/2">
      {filteredWorkouts?.map((workout, i) => (
        <div className="workout-card bg-white rounded-lg shadow-md p-4 mb-4" key={i}>
          <h3 className="font-bold text-xl mb-2 bg-blue-500 text-gray-200 p-2 rounded">Created by: <span className="font-bold text-white">{workout.user.username}</span></h3>
          {workout.exercises.map((exercise, j) => (
            <div key={j} className="exercise-card bg-gray-200 bg-opacity-50 rounded-lg shadow-inner p-4 mb-2">
              <h5 className="font-bold text-blue-500 border-b-4 border-blue-400 mb-2 text-center">{exercise.exercise}</h5>
              <div className="flex justify-between">
                <p>Sets: <span className="font-bold">{exercise.sets}</span></p>
                <p>Reps: <span className="font-bold">{exercise.reps}</span></p>
              </div>
            </div>
          ))}
          {workout.cardio.type.length ? (
            <div className="cardio-card bg-gray-200 rounded-lg shadow-inner p-4 mb-2">
              <h5 className="font-bold text-blue-500 border-b border-blue-400 mb-2">Cardio: {workout.cardio.type}</h5>
              <p>Time: <span className="font-bold">{workout.cardio.time}</span> min</p>
            </div>
          ) : null}
          <div className="mt-4 flex justify-end">
            <Link
              to={`/comments/${workout._id}`}
              className="text-blue-500 hover:bg-slate-200 font-bold px-4 py-2 bg-slate-100 shadow-inner rounded-lg"
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