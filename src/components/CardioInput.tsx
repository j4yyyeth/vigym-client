import { useRef } from "react";

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
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 sm:mr-2 mb-4 sm:mb-0">
          <label htmlFor="cardio-type" className="block text-gray-700 font-medium mb-2">Cardio</label>
          <input
            ref={typeRef}
            id="cardio-type"
            className="appearance-none border border-gray-300 rounded py-2 px-3 w-full leading-tight focus:outline-none focus:border-blue-500"
            type="text"
            defaultValue={type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          />
        </div>
        <div className="flex-1 sm:ml-2">
          <label htmlFor="cardio-time" className="block text-gray-700 font-medium mb-2">Time</label>
          <div className="flex items-center">
            <input
              ref={timeRef}
              id="cardio-time"
              className="appearance-none border border-gray-300 rounded py-2 px-3 w-full leading-tight focus:outline-none focus:border-blue-500"
              type="number"
              defaultValue={time}
              onChange={(e) => handleInputChange("time", parseInt(e.target.value))}
            />
            <span className="ml-2">min</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardioInput;