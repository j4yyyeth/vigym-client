import { useState, useEffect } from "react";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";

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
    <div className="bg-custom-white rounded-xl m-10 flex md:flex-row flex-col gap-3 shadow-xl p-16">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="w-full">
          <h4 className="day text-center">{day}</h4>
          <select className="rounded-lg w-full" value={schedule[index] || ""} onChange={(e) => handleWorkoutChange(index, e)}>
            <option value="">Select Workout</option>
            {workouts.map((workout, i) => (
              <option className="text-black text-center" key={i} value={workout._id}>Workout {i + 1}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );        
};

export default Calendar;