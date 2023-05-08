import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const Calendar = ({ workouts, user, userSchedule }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const initializeSchedule = () => {
    const initialSchedule = new Array(7).fill(null);
    if (Array.isArray(userSchedule)) {
      userSchedule.forEach(item => {
        initialSchedule[item.dayIndex] = item?.workout?._id;
      });
    }
    return initialSchedule;
  };  
  
  const [schedule, setSchedule] = useState(initializeSchedule);

  useEffect(() => {
    if (user) {
      fetchSchedule();
    }
  }, [user]);
  
  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${baseUrl}/workouts/schedule/${user._id}`);
      const fetchedSchedule = new Array(7).fill(null);
      response.data.forEach(item => {
        fetchedSchedule[item.dayIndex] = item?.workout?._id;
      });
      setSchedule(fetchedSchedule);
    } catch (err) {
      console.log(err);
    }
  };

  const handleWorkoutChange = (dayIndex, e) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex] = e.target.value;
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  };
  
  const saveSchedule = async (updatedSchedule) => {
    try {
      const formattedSchedule = updatedSchedule.map((workoutId, dayIndex) => ({
        dayIndex,
        workout: workoutId,
      }));
      await axios.put(`${baseUrl}/workouts/schedule/${user._id}`, {
        schedule: formattedSchedule,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="calendar">
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
