import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import { Exercises as ExerciseType } from "../context/loadingContext";

const Exercises = () => {
  const { exerciseLibrary, getExercisesLibrary } = useContext(LoadingContext) || {};
  
  const [ equipmentFilter, setEquipmentFilter ] = useState("");
  const [ targetFilter, setTargetFilter ] = useState("");
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    getExercisesLibrary?.()
  }, []);

  const uniqueEquipments = Array.from(new Set(exerciseLibrary?.map(e => e.equipment)));
  const uniqueTargets = Array.from(new Set(exerciseLibrary?.map(e => e.target)));

  const filteredExercises = exerciseLibrary?.filter(e => 
    (equipmentFilter ? e.equipment === equipmentFilter : true) && 
    (targetFilter ? e.target === targetFilter : true) &&
    (search ? e.name.toLowerCase().includes(search.toLowerCase()) : true)
  );

  return (
    <div className="flex mx-auto px-4 md:w-1/2 h-screen">
      <div className="flex mt-12">
        <div className="m-4 bg-white bg-opacity-30 rounded p-4">
          <input
            type="text"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <h3 className="text-sm text-gray-800">Filter by equipment:</h3>
          <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" onChange={(e) => setEquipmentFilter(e.target.value)}>
            <option value="">All Equipment</option>
            {uniqueEquipments.map((equipment, index) => (
              <option key={index} value={equipment}>{equipment}</option>
            ))}
          </select>
          <h3 className="mt-4 text-sm text-gray-800">Filter by target muscle:</h3>
          <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" onChange={(e) => setTargetFilter(e.target.value)}>
            <option value="">All Muscles</option>
            {uniqueTargets.map((target, index) => (
              <option key={index} value={target}>{target}</option>
            ))}
          </select>
          <p className="text-black text-center mt-2"><strong>{filteredExercises?.length}</strong> Exercises</p>
        </div>
        <div className="w-3/4 overflow-auto">
          <div className="flex flex-col space-y-4">
            {
              exerciseLibrary?.length === 0  ? 
              <h3 className="text-white">Loading ...</h3>
              : filteredExercises?.length === 0 
              ? <h3 className="text-white">No results</h3> 
              : filteredExercises?.map((e: ExerciseType) => {
                  return (
                   <div className="bg-white rounded-lg shadow-md p-4 mb-4" key={e.id}>
                      <h3 className="font-bold text-xl mb-2 bg-blue-500 text-gray-200 p-2 rounded">{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</h3>
                      <div className="bg-gray-200 bg-opacity-50 rounded-lg shadow-inner p-4 mb-2">
                        <p>Equipment: <span className="font-bold">{e.equipment.charAt(0).toUpperCase() + e.equipment.slice(1)}</span></p>
                        <p>Target: <span className="font-bold">{e.target.charAt(0).toUpperCase() + e.target.slice(1)}</span></p>
                      </div>
                      <img id='workout-gif' src={e.gifUrl} alt={e.name} className="rounded-md shadow-md mb-4" />
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;