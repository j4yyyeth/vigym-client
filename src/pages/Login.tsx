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
        console.log("Changing user", thisUser)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post('/auth/login', thisUser)
            .then((results) => {
                console.log("Created User", results.data)
                navigate('/')
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type='username' name="username" value={thisUser.username} onChange={handleChange}></input>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" type='password' name="password" value={thisUser.password} onChange={handleChange}></input>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign In
                    </button>
                    <h4 className="err-msg text-red-500 text-center">{message}</h4>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600">No account?{' '}<Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login