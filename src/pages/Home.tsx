import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube, FaTelegram, FaChevronDown, FaChevronUp, FaUser, FaRobot, FaDumbbell, FaBook, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Feature from '../components/Feature';

const Home = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const questions = [
    { id: 1, question: "What is ViGym about?", answer: "Here at ViGym we're about empowering and enabling people to get into shape through technology, no matter who you are or where you're from." },
    { id: 2, question: "Is ViGym free to use?", answer: "Yes, ViGym is completely free to use. We will be opening up our store soon, but your are never forced to buy anything." },
    { id: 3, question: "How can I start?", answer: "Start by signing up for an account, and creating a workout. From there you can explore our plethora of features!" }
  ];

  return (
    <div>
      <div className="landing-image">
        <img src="./home-gym.jpg" alt="Landing" className="w-full h-screen object-cover"/>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-white bg-custom-black font-bold text-5xl mb-6 p-6 rounded-3xl">Welcome to ViGym</h1>
          <div className="flex space-x-4">
          <Link to="/signup" className="bg-gradient-to-r from-custom-red-1 via-custom-red-2 to-custom-red-1 text-white font-semibold py-2 px-4 rounded-md shadow-md">
            Get Started
          </Link>

            <Link to="login" className="bg-gradient-to-r from-custom-red-1 via-custom-red-2 to-custom-red-1 text-white font-semibold py-2 px-4 rounded-md shadow-md">
              Log In
            </Link>
          </div>
        </div>
      </div>
    <div>
      <div className="w-full py-20 bg-white px-8">
        <Feature>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Feature>
          <div className="flex flex-col items-center text-center">
          <FaBook className="w-full h-20 object-cover mb-4 rounded-lg"/>
              <h3 className="text-custom-red-1 font-bold text-2xl mb-2 hover:text-blue-500"><Link to='/exercises'>Exercise Library</Link></h3>
            <p>View over 1300 exercises with demonstrations</p>
          </div>
          </Feature>
          <Feature>
          <div className="flex flex-col items-center text-center">
          <FaSearch className="w-full h-20 object-cover mb-4 rounded-lg"/>
            <h3 className="text-custom-red-1 font-bold text-2xl mb-2 hover:text-blue-500"><Link to='/workouts'>View Workouts</Link></h3>
            <p>See what workouts other users have created</p>
          </div>
          </Feature>
          <Feature>
          <div className="flex flex-col items-center text-center">
          <FaDumbbell className="w-full h-20 object-cover mb-4 rounded-lg"/>
            <h3 className="text-custom-red-1 font-bold text-2xl mb-2 hover:text-blue-500"><Link to='/create-workout'>Create Workouts</Link></h3>
            <p>Create and personalize your own workouts</p>
          </div>
          </Feature>
          <Feature>
          <div className="flex flex-col items-center text-center">
            <FaUser className="w-full h-20 object-cover mb-4 rounded-lg"/>
            <h3 className="text-custom-red-1 font-bold text-2xl mb-2 hover:text-blue-500"><Link to='/dashboard'>Dashboard</Link></h3>
            <p>View, edit, and analyze your workouts, as well as schedule your week</p>
          </div>
          </Feature>
          <Feature>
          <div className="flex flex-col items-center text-center">
          <FaRobot className="w-full h-20 object-cover mb-4 rounded-lg"/>
            <h3 className="text-custom-red-1 font-bold text-2xl mb-2 hover:text-blue-500"><Link to='/trainer'>AI Trainer</Link></h3>
            <p>Chat with ViGym's AI personal trainer, using your real time workout data</p>
          </div>
          </Feature>
        </div>
        </Feature>
      </div>

      <div className="w-full py-20 bg-custom-black">
        <h2 className="text-center text-white font-bold text-3xl mb-8">FAQ</h2>
        <div className="flex flex-wrap justify-around px-4">
          {questions.map(q => (
            <div className="w-full sm:w-1/2 lg:w-1/4 p-4 text-white" key={q.id}>
              <div 
                onClick={() => setOpenQuestion(openQuestion === q.id ? null : q.id)}
                className="cursor-pointer flex justify-between items-center"
              >
                <h3 className="font-bold text-xl mb-2">{q.question}</h3>
                {openQuestion === q.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openQuestion === q.id && <p>{q.answer}</p>}
            </div>
          ))}
        </div>
      </div>
      <footer className="w-full py-10 bg-white flex flex-col items-center justify-center">
  <h2 className="font-bold text-2xl text-blue-600 mb-4">Connect with us:</h2>
  <div className="flex space-x-4 mb-6">
    <a href="https://twitter.com" target="_blank" rel="noreferrer">
      <FaTwitter className="text-blue-600 h-6 w-6"/>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <FaInstagram className="text-blue-600 h-6 w-6"/>
    </a>
    <a href="https://tiktok.com" target="_blank" rel="noreferrer">
      <FaTiktok className="text-blue-600 h-6 w-6"/>
    </a>
    <a href="https://youtube.com" target="_blank" rel="noreferrer">
      <FaYoutube className="text-blue-600 h-6 w-6"/>
    </a>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <FaFacebook className="text-blue-600 h-6 w-6"/>
    </a>
  </div>
  <div className="flex space-x-4 mb-6">
    <a href="/about" className="text-custom-red-1 hover:text-blue-600">About</a>
    <a href="/contact" className="text-custom-red-1 hover:text-blue-600">Contact</a>
    <a href="/privacy" className="text-custom-red-1 hover:text-blue-600">Privacy Policy</a>
    <a href="/terms" className="text-custom-red-1 hover:text-blue-600">Terms of Service</a>
  </div>
  <div className="flex space-x-4">
    <input 
      type="text" 
      placeholder="Email Address" 
      className="py-2 px-4 rounded-md shadow-md border border-gray-300"
    />
    <button 
      className="bg-gradient-to-r from-custom-red-1 via-custom-red-2 to-custom-red-1 text-white font-semibold py-2 px-4 rounded-md shadow-md"
    >
      Subscribe
    </button>
  </div>
</footer>

          </div>
    </div>
  );
};

export default Home;

