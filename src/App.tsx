import './App.css';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';
import CreateWorkouts from './pages/CreateWorkout';
import Store from './pages/Store';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {

  const getToken = () => {
    return localStorage.getItem('authToken');
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/signup" />;
  };

  const LoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  }
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<LoggedOut />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Route>
        <Route path='/exercises' element={<Exercises />} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/store' element={<Store />} />
        <Route element={<LoggedIn />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-workout' element={<CreateWorkouts />} />
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      {/* <MusicPlayer /> */}
    </div>
  );
}

export default App;
