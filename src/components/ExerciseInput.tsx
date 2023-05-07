import { useEffect, useRef } from "react";

interface ExerciseInputProps {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  onInputChange: (field: string, value: string | number) => void;
  focus: boolean;
}

const ExerciseInput: React.FC<ExerciseInputProps> = ({ exercise, sets, reps, weight, onInputChange, focus }) => {
  const exerciseRef = useRef<HTMLInputElement>(null);
  const setsRef = useRef<HTMLInputElement>(null);
  const repsRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && exerciseRef.current) {
      exerciseRef.current.focus();
    }
  }, [focus]);

  const handleInputChange = (field: string, value: string | number) => {
    onInputChange(field, value);
  };

  return (
    <div>
      <input
        ref={exerciseRef}
        defaultValue={exercise}
        onChange={(e) => handleInputChange("exercise", e.target.value)}
      />
      <label>Sets</label>
      <input
        ref={setsRef}
        defaultValue={sets}
        onChange={(e) => handleInputChange("sets", parseInt(e.target.value))}
      />
      <label>Reps</label>
      <input
        ref={repsRef}
        defaultValue={reps}
        onChange={(e) => handleInputChange("reps", parseInt(e.target.value))}
      />
      <label>Weight</label>
      <input
        ref={weightRef}
        defaultValue={weight}
        onChange={(e) => handleInputChange("weight", parseInt(e.target.value))}
      />
    </div>
  );
};

export default ExerciseInput;
