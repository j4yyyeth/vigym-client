import { useState } from "react";

const Calendar = ({ workouts }) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [schedule, setSchedule] = useState(new Array(7).fill(null));

  const handleWorkoutChange = (dayIndex, e) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex] = workouts[e.target.value];
    setSchedule(newSchedule);
  };

  return (
    <div>
      {daysOfWeek.map((day, index) => (
        <div key={index} className="day">
          <h4>{day}</h4>
          <select value={schedule[index] ? schedule[index]._id : ""} onChange={(e) => handleWorkoutChange(index, e)}>
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
