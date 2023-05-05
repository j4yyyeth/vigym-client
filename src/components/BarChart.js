import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

const labels = ["Sets", "Reps", "Weight"];

const BarChart = () => {
  const { workouts } = useContext(LoadingContext);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(0);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (workouts && workouts.length > 0) {
      setColors(generateColors(workouts));
    }
  }, [workouts]);

  const handleWorkoutChange = (e) => {
    setSelectedWorkoutIndex(Number(e.target.value));
  };

  const generateColors = (workouts) => {
    return workouts.map(() => `rgb(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 256)})`);
  };

  const generateDatasets = (workouts, selectedIndex, colors) => {
    return workouts[selectedIndex].exercises.map((e, index) => ({
      label: e.exercise,
      backgroundColor: colors[index],
      borderColor: "black",
      borderWidth: 1,
      data: [e.sets, e.reps, e.weight],
    }));
  };

  const data = {
    labels: labels,
    datasets: workouts && workouts.length > 0 && colors.length > 0 ? generateDatasets(workouts, selectedWorkoutIndex, colors) : [],
  };

  return (
    <>
      {workouts && workouts.length > 0 && (
        <>
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
        </>
      )}
      <Bar data={data} />
    </>
  );
};

export default BarChart;