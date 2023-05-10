import { Link } from "react-router-dom";
import { useState } from "react";
import WorkoutCard from "../components/WorkoutCard";

const Workouts = () => {
  const [filter, setFilter] = useState(null);

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex mt-12">
      <div className="m-4 bg-white bg-opacity-30 rounded p-4">
        <Link className="bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded mb-4 block" to={'/create-workout'}>Create a Workout</Link>
        <div>
          <label htmlFor="filter" className="block text-sm text-gray-600">Filter by number of exercises</label>
          <select id="filter" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6+</option>
          </select>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto" style={{maxHeight: '80vh'}}>
        <WorkoutCard filter={filter} />
      </div>
    </div>
  );  
  
};

export default Workouts;
