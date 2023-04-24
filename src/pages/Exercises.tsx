import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Exercises as ExerciseType } from "../context/loadingContext";

const Exercises = () => {

  const { exerciseLibrary, getExercisesLibrary } = useContext(LoadingContext) || {};

  useEffect(() => {
    getExercisesLibrary?.();
  }, []);

  return (
    <div>
      {
        exerciseLibrary?.map((e: ExerciseType) => {
          return (
            <div key={e.id}>
              <h3>{e.name}</h3>
              <p>Body Part: {e.bodyPart}</p>
              <p>Equipment: {e.equipment}</p>
              <p>Target: {e.target}</p>
              <img src={e.gifUrl} alt={e.name} />
              <br></br>
              <br></br>
            </div>
          )
        })
      }
    </div>
  )
}

export default Exercises;
