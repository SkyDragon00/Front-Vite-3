import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { getApi } from '../../services';

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!email, !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const api = getApi();
            const response = await api.post('/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);

            const user = response.data.user;

            if (user.role === 1){
                navigate('/home');
            } else if (user.role === 2) {
                navigate('/admin');
            } else {
                setError('Invalid user role');
                return;
            }
        } catch (error) {
            setError('Invalid email or password');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <h1>Login</h1>
            <p>Log in to access your account</p>

            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <input type="email" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Password" onChange={handlePassword} />
                <button type="submit">Login</button>
            </form>

            <a href="/register">Registrar Cuenta</a>
        </>
    )
}
