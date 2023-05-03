import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const labels = ["Sets", "Reps", "Weight"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Pushups",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [3, 15, 0]
    },
    {
      label: "Pull-ups",
      backgroundColor: "rgb(155, 200, 132)",
      borderColor: "rgb(155, 200, 132)",
      data: [3, 10, 30]
    },
    {
      label: "Squats",
      backgroundColor: "rgb(155, 155, 150)",
      borderColor: "rgb(155, 155, 150)",
      data: [4, 5, 75]
    }
  ],
};

const LineChart = () => {

  const { workouts } = useContext(LoadingContext);

  return (
    <div>
      <Line data={data} />
      <h1>{data.labels}</h1>
    </div>
  );
};

export default LineChart;