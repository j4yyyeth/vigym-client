import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const labels = ["Sets", "Reps", "Weight"];

const LineChart = () => {

  const { workouts } = useContext(LoadingContext);
  const generateDatasets = (workouts) => {
    return workouts[0].exercises.map((e) => ({
      label: e.exercise,
      backgroundColor: 'white',
      borderColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      data: [e.sets, e.reps, e.weight],
    }));
  };

  const data = {
    labels: labels,
    datasets: workouts && workouts.length > 0 ? generateDatasets(workouts) : []
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;