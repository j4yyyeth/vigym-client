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
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  getUserWorkouts: () => void;
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
      <LoadingContext.Provider value={{render, setRender, user, setUser, isLoading, setIsLoading, exerciseLibrary, setExerciseLibrary, getExercisesLibrary, workouts, setWorkouts, getUserWorkouts}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }