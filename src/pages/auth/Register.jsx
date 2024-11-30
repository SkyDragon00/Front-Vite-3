import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from '../../services';

export const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!name, !email, !password, !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const api = getApi();
            const response = await api.post('/users', {
                name,
                email,
                password,
                role: 'USER_ROLE'
            });

            if (response.status === 201) {
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            setError('Invalid email or password');
            setName('');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <h1>Register</h1>
            <p>Register to create an account</p>

            <form onSubmit={handleSubmit}>
                {error && <p>{error} </p>}
                <input type="text" placeholder="Name" onChange={handleName} />
                <input type="email" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Password" onChange={handlePassword} />
                <input type="password" placeholder="Confirm Password" onChange={handleConfirmPassword} />
                <button type="submit">Register</button>
            </form>

            <a href="/">Login</a>
        </>
    )
}
