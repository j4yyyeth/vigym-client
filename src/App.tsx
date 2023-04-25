import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';
import CreateWorkouts from './pages/CreateWorkout';
import Store from './pages/Store';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/exercises' element={<Exercises />} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/store' element={<Store />} />
        <Route path='*' element={<NotFound />}/>
        <Route path='/create-workout' element={<CreateWorkouts />} />
      </Routes>
    </div>
  );
}

export default App;
