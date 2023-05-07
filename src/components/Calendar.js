import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Calendar = ({ workouts, user }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [schedule, setSchedule] = useState(new Array(7).fill(null));

  useEffect(() => {
    if (user) {
      fetchSchedule();
      saveSchedule();
    }
  }, [user]);
  
  // useEffect(() => {
  //   if (user) {
  //     saveSchedule();
  //   }
  // }, [schedule]);
  
  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${baseUrl}/workouts/schedule/${user._id}`);
      const fetchedSchedule = new Array(7).fill(null);
      response.data.forEach(item => {
        fetchedSchedule[item.dayIndex] = item?.workout?._id;
      });
      setSchedule(fetchedSchedule);
    } catch (error) {
      console.error(error);
    }
  };

const handleWorkoutChange = (dayIndex, e) => {
  const newSchedule = [...schedule];
  newSchedule[dayIndex] = e.target.value;
  setSchedule(newSchedule);
};
  
  const saveSchedule = async () => {
    try {
      const formattedSchedule = schedule.map((workoutId, dayIndex) => ({
        dayIndex,
        workout: workoutId,
      }));
      await axios.put(`${baseUrl}/workouts/schedule/${user._id}`, {
        schedule: formattedSchedule,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div>
      {daysOfWeek.map((day, index) => (
        <div key={index} className="day">
          <h4>{day}</h4>
          <select value={schedule[index] || ""} onChange={(e) => handleWorkoutChange(index, e)}>
            <option value="">Select Workout</option>
            {workouts.map((workout, i) => (
              <option key={i} value={workout._id}>
                Workout {i + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );  
};

export default Calendar;
