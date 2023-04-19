import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Workouts from './pages/Workouts';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/exercises' element={<Exercises />} />
        <Route path='/workouts' element={<Workouts />} />
        {/* <Route path='/' element={< />} /> */}
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
