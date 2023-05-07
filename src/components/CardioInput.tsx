import { useEffect, useRef } from "react";

interface CardioInputProps {
  type: string;
  time: number;
  onInputChange: (field: string, value: string | number) => void;
}

const CardioInput: React.FC<CardioInputProps> = ({ type, time, onInputChange }) => {
  const typeRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number) => {
    onInputChange(field, value);
  };

  return (
    <div>
    <label>Cardio</label>
      <input
        ref={typeRef}
        defaultValue={type}
        onChange={(e) => handleInputChange("type", e.target.value)}
      />
      <label>Time</label>
      <input
        type="number"
        ref={timeRef}
        defaultValue={time}
        onChange={(e) => handleInputChange("time", parseInt(e.target.value))}
      /> min
    </div>
  );
};

export default CardioInput;