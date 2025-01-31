import { useState } from "react";
import axios from 'axios';
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { Success } from "../components/Success";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Config.js";


export const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSucces] = useState()
    const navigaTo = useNavigate();

    const register = async () => {
        if (password === confirmPassword) {
            const user = {
                name, email, password, confirmPassword
            }
            try {
                setLoading(true)
                const result = (await axios.post(`${API_URL}/api/users/register`, user)).data
                setLoading(false);
                setSucces(true);
                setName('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setTimeout(() => {
                    navigaTo('/login')
                }, 3000);
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
            }
        } else { alert('Passwords not matched!') }
    }
    return (
        <div className="login-father mt-3">
            {loading && <Loader />}{error && <Error />}
            <div className="login py-5 px-4">
                {success && <Success message='Registration Success!' />}
                <h1>Register</h1>
                <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input
                    type="password"
                    className="form-control"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
                <button className="btn btn-primary" onClick={register}>Register</button>
            </div>
        </div>
    )
}
