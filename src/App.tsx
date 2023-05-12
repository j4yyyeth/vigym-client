import './App.css';
import { Route, Routes, Outlet, Navigate, useLocation } from 'react-router-dom';
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
import Trainer from './pages/Trainer';
import Comments from './pages/Comments';
import ScrollToTop from './components/ScrollToTop';

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

  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const show = !isLoginPage && !isSignupPage;
  
  return (
    <div className="App">
      { show && <Navbar /> }
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/workouts' element={<Workouts />} />
        <Route path='/store' element={<Store />} />
        <Route path='/exercises' element={<Exercises />} />

        <Route element={<LoggedOut />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<LoggedIn />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/trainer' element={<Trainer />} />
          <Route path='/create-workout' element={<CreateWorkouts />} />
          <Route path='/comments/:workoutId' element={<Comments />} />
        </Route>
        <Route path='*' element={<NotFound />}/>

      </Routes>
      <ScrollToTop />
      { show && <MusicPlayer className="fixed bottom-0 left-0 p-4 m-2" />}
    </div>
  );
}

export default App;
