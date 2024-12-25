
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                username,
                password,
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            console.log("Login token: ", token);
            window.location.href = '/dashboard';
        } catch (err) {
            console.log('Login failed: ', err);
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;
