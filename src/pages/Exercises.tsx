import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Exercises as ExerciseType } from "../context/loadingContext";

const Exercises = () => {

  const { exerciseLibrary, getExercisesLibrary } = useContext(LoadingContext) || {};

  useEffect(() => {
    getExercisesLibrary?.()
  }, []);

  return (
    <div className="image-grid">
      {
        exerciseLibrary?.map((e: ExerciseType) => {
          return (
            <div className="exercises-flex" key={e.id}>
              <h3>{e.name}</h3>
              <p>Body Part: {e.bodyPart}</p>
              <p>Equipment: {e.equipment}</p>
              <p>Target: {e.target}</p>
              <img id='workout-gif' src={e.gifUrl} alt={e.name} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Exercises;
