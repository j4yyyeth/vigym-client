import { useState, createContext, ReactNode } from "react";
import { get, post } from "../services/authService";
import { User } from "./authContext";
import { baseUrl } from "../services/baseUrl";

interface LoadingProviderProps {
  children: ReactNode;
}

export interface LoadingContextProps {
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseLibrary: Array<Exercises>;
  setExerciseLibrary: React.Dispatch<React.SetStateAction<Array<Exercises>>>;
  getExercisesLibrary: () => void;
  allWorkouts: Workout[];
  setAllWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  getAllWorkouts: () => void;
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  getUserWorkouts: () => void;
  updateWorkout: (updatedWorkout: Workout) => void;
}

export interface Exercises {
  bodyPart: string,
  equipment: string,
  gifUrl: string,
  id: string,
  name: string,
  target: string
}

export interface Exercise {
  exercise: string,
  sets: number,
  reps: number,
  weight: number
}

export interface Workout {
  _id: string;
  exercises: Exercise[];
}

const LoadingContext = createContext<LoadingContextProps | null>(null);

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [ render, setRender ] = useState(false);
    const [ exerciseLibrary, setExerciseLibrary ] = useState<Array<Exercises>>([]);
    const [ allWorkouts, setAllWorkouts ] = useState<Workout[]>([]);
    const [ workouts, setWorkouts ] = useState<Workout[]>([]);

    const getExercisesLibrary = () => {
      get('/exercises')
      .then((results) => {
        setExerciseLibrary(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const updateWorkout = (updatedWorkout: Workout) => {
      // Find the index of the workout to update in the current state
      const workoutIndex = workouts.findIndex((workout) => workout._id === updatedWorkout._id);
    
      // Replace the old workout data with the updated workout data
      const newWorkouts = [...workouts];
      newWorkouts[workoutIndex] = updatedWorkout;
    
      // Update the state
      setWorkouts(newWorkouts);
    };

    const getAllWorkouts = () => {
      get('/workouts/all')
      .then((results) => {
        setAllWorkouts(results.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const getUserWorkouts = () => {
      if (!user) {
        return;
      }
      get(`/workouts/user/${user._id}`)
      .then((results) => {
        setWorkouts(results.data)
      })
      .catch((err) => {
        console.log(err)
      })

    }
    

    return (
      <LoadingContext.Provider value={{render, setRender, user, setUser, isLoading, setIsLoading, exerciseLibrary, setExerciseLibrary, getExercisesLibrary, allWorkouts, setAllWorkouts, getAllWorkouts, workouts, setWorkouts, getUserWorkouts, updateWorkout}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }