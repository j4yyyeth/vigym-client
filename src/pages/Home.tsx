const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-custom-light-blue to-blue-400 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mb-6">Welcome to ViGym</h1>
      <p className="text-white text-lg mb-10 text-center mx-4">
        ViGym is a full stack fitness app that lets you create workouts, view workouts, houses an AI trainer, a library of exercises, and is a great way to achieve your fitness goals.
      </p>
      <div className="flex space-x-4">
        <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md shadow-md">
          Sign Up
        </button>
        <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-md shadow-md">
          Log In
        </button>
      </div>
    </div>
  );
};

export default Home;
