import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Signup = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext not initialized");
    }

    const { authenticateUser } = context;

    const [ newUser, setNewUser ] = useState(
        {
            email: "",
            username: "",
            password: ""
        }
    )

    const [ message, setMessage ] = useState('');

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser((recent)=>({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((results) => {
                navigate(`/dashboard`)
                localStorage.setItem('authToken', results.data.token )
                
            })
            .catch((err) => {
                console.log(err)
                setTimeout(()=>{
                    setMessage(err.response.data.message);
                }, 1000)
            })
            .finally(() => {
                authenticateUser()
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url(/gym-bg.jpg)' }}>
            <div className="flex items-center justify-center p-10 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <div className="max-w-md w-full space-y-1">
                    <img src='/vigym.png' alt="logo" height={215} width={215} className="mx-auto" />
                    <form onSubmit={handleSubmit} className="space-y-6" style={{ width: '300px' }}>
                        <label className="block text-lg font-medium text-gray-700">Email</label>
                        <input type='email' name="email" value={newUser.email} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base"></input>
                        <label className="block text-lg font-medium text-gray-700">Username</label>
                        <input type='username' name="username" value={newUser.username} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base"></input>
                        <label className="block text-lg font-medium text-gray-700">Password</label>
                        <input type='password' name="password" value={newUser.password} onChange={handleChange} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-base"></input>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-custom-blue hover:bg-custom-light-blue">Sign Up</button>
                        <h4 className="err-msg text-red-500 text-center">{message}</h4>
                    </form>
                    <p className="mt-2 text-center text-md text-gray-600">Already a user?{' '}<Link to="/login" className="font-medium text-blue-500 hover:text-custom-light-blue">Sign In</Link></p>
                </div>
            </div>
        </div>
    ); 
}

export default Signup;