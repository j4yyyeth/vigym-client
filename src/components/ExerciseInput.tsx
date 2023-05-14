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
    <div className="border border-blue-400 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-2">Exercise</label>
          <input
            ref={exerciseRef}
            defaultValue={exercise}
            onChange={(e) => handleInputChange("exercise", e.target.value)}
            onFocus={onInputFocus}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-2">Sets</label>
          <input
            type="number"
            ref={setsRef}
            defaultValue={sets}
            onChange={(e) => handleInputChange("sets", parseInt(e.target.value))}
            onFocus={onInputFocus}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-2">Reps</label>
          <input
            type="number"
            ref={repsRef}
            defaultValue={reps}
            onChange={(e) => handleInputChange("reps", parseInt(e.target.value))}
            onFocus={onInputFocus}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="col-span-1">
          <label className="block font-medium text-gray-700 mb-2">Weight (lbs)</label>
          <input
            type="number"
            ref={weightRef}
            defaultValue={weight}
            onChange={(e) => handleInputChange("weight", parseInt(e.target.value))}
            onFocus={onInputFocus}
            className="border border-gray-400 rounded-md px-3 py-2 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseInput;