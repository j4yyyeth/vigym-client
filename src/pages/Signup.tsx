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
                console.log("Created User", results.data)
                navigate(`/`)
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type='email' name="email" value={newUser.email} onChange={handleChange}></input>
                <label>Username</label>
                <input type='username' name="username" value={newUser.username} onChange={handleChange}></input>
                <label>Password</label>
                <input type='password' name="password" value={newUser.password} onChange={handleChange}></input>
                <button type="submit">Sign Up</button>
                <h4 className="err-msg">{message}</h4>
            </form>
            <p>Already a user? <Link to="/login">Log In</Link></p>
        </div>
    )
}

export default Signup;