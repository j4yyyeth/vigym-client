import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const labels = ["Sets", "Reps", "Weight"];

const BarChart = () => {

  const { workouts } = useContext(LoadingContext);
  const generateDatasets = (workouts) => { // Workouts is an array. User presses a button to display one of their workouts
    return workouts[0].exercises.map((e) => ({
      label: e.exercise,
      backgroundColor: `rgb(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 256)})`,
      borderColor: 'black',
      borderWidth: 1,
      data: [e.sets, e.reps, e.weight]
    }));
  };

  const data = {
    labels: labels,
    datasets: workouts && workouts.length > 0 ? generateDatasets(workouts) : []
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;