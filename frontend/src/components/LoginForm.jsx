
import React, { useState } from "react";
import '../styles/Forms.css';
import axios from "../../../AxiosConfig";

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post('auth/login', { login, password });
        console.log(res);
        if (res.status == 200) {
          console.log('yes here something');
          location.href = '/dashboard';
        }
      } catch (error) {
        console.log(error);
        setMessage("Error loggin in!");
      }
    };

    return (
      <>
          <form onSubmit={handleLogin} className="wrapper">
            <h1>Login</h1>
            <label htmlFor="login">Email or Username</label>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Email or Username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Log In</button>
        
            <p>{message}</p>
          </form>
      </>
    );
};

export default LoginForm