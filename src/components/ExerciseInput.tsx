import { useEffect, useRef } from "react";

interface ExerciseInputProps {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  onInputChange: (field: string, value: string | number) => void;
  focusId: string;
  focus: boolean;
  onInputFocus: () => void;
}

const ExerciseInput: React.FC<ExerciseInputProps> = ({ exercise, sets, reps, weight, onInputChange, focus, onInputFocus, focusId }) => {
  const exerciseRef = useRef<HTMLInputElement>(null);
  const setsRef = useRef<HTMLInputElement>(null);
  const repsRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && focusId.endsWith("-0") && exerciseRef.current) {
      exerciseRef.current.focus();
    }
  }, [focus, focusId]);

  const handleInputChange = (field: string, value: string | number) => {
    onInputChange(field, value);
  };

  return (
    <div>
      <input
        ref={exerciseRef}
        defaultValue={exercise}
        onChange={(e) => handleInputChange("exercise", e.target.value)}
        onFocus={onInputFocus}
      />
      <label>Sets</label>
      <input
        type="number"
        ref={setsRef}
        defaultValue={sets}
        onChange={(e) => handleInputChange("sets", parseInt(e.target.value))}
        onFocus={onInputFocus}
      />
      <label>Reps</label>
      <input
        type="number"
        ref={repsRef}
        defaultValue={reps}
        onChange={(e) => handleInputChange("reps", parseInt(e.target.value))}
        onFocus={onInputFocus}
      />
      <label>Weight</label>
      <input
        type="number"
        ref={weightRef}
        defaultValue={weight}
        onChange={(e) => handleInputChange("weight", parseInt(e.target.value))}
        onFocus={onInputFocus}
      /> lbs
    </div>
  );
};

export default ExerciseInput;
