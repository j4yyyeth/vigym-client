import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";

const labels = ["Sets", "Reps", "Weight"];

const BarChart = () => {
  const { workouts } = useContext(LoadingContext);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);

  const handleWorkoutChange = (e) => {
    setSelectedWorkoutIndex(Number(e.target.value));
  };

  const generateDatasets = (workouts, selectedIndex) => {
    return workouts[selectedIndex].exercises.map((e) => ({
      label: e.exercise,
      backgroundColor: `rgb(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 256)})`,
      borderColor: "black",
      borderWidth: 1,
      data: [e.sets, e.reps, e.weight],
    }));
  };

  const data = {
    labels: labels,
    datasets: workouts && workouts.length > 0 ? generateDatasets(workouts, selectedWorkoutIndex) : [],
  };

  return (
    <div>
      {workouts && workouts.length > 0 && (
        <div>
          <br></br>
          <label htmlFor="workout-select">Select Workout: </label>
          <br></br>
          <select id="workout-select" onChange={handleWorkoutChange}>
            {workouts.map((e, index) => (
              <option key={index} value={index}>
                Workout {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      <Bar data={data} />
    </div>
  );
};

export default BarChart;