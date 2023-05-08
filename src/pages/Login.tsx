import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { post } from "../services/authService";
import { Link } from "react-router-dom";


const Login = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext not initialized");
    }

    const { authenticateUser } = context;

    const [ thisUser, setthisUser ] = useState(
        {
            username: "",
            password: ""
        }
    )

    const [ message, setMessage ] = useState('');

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setthisUser((recent)=>({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post('/auth/login', thisUser)
            .then((results) => {
                navigate('/dashboard')
                localStorage.setItem('authToken', results.data.token )
            })
            .catch((err) => {
                console.log(err)
                setTimeout(()=>{
                    setMessage(err.response.data.message);
                }, 1000)
            })
            .finally(() => {
                authenticateUser();
            })
    } 

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url(/gym-bg.jpg)' }}>
            <div className="flex items-center justify-center p-10 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <div className="max-w-md w-full space-y-8">
                <img src='/vigym.png' alt="logo" height={215} width={215} className="mx-auto" />
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" style={{ width: '300px' }}>
                        <label className="block text-lg font-medium text-gray-700">Username</label>
                        <input type='username' name="username" value={thisUser.username} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"></input>
                        <label className="block text-lg font-medium text-gray-700">Password</label>
                        <input type='password' name="password" value={thisUser.password} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"></input>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-custom-blue hover:bg-custom-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue">Sign In</button>
                        <h4 className="err-msg text-red-500 text-center">{message}</h4>
                    </form>
                    <p className="mt-2 text-center text-md text-gray-600">No account?{' '}<Link to="/signup" className="font-medium text-custom-blue hover:text-custom-light-blue">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );          
}

export default Login