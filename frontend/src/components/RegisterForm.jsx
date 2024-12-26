
import { useState } from "react";
import '../styles/LogRegForms.css';
import axios from "axios";

const RegisterFrom = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password != repPassword) {
          setMessage("The passwords do not match.");
          return
        } 
      
        try {
            setMessage("");
            const res = await axios.post('http://localhost:5000/auth/signup', {username, email, password});
            const tkn = res.data.token;
            
            localStorage.setItem('token', tkn);
            window.location.href = '/home';
        } catch (error) {
            console.log(error);
            setMessage("Error creating user!");
        }
    };

    return (
      <>
          <form onSubmit={handleRegister} className="wrapper">
            <h1>Register</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="repPassword">Confirm Password</label>
            <input
              type="password"
              name="repPassword"
              id="repPassword"
              placeholder="Repeat Password"
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
              required
            />

            <p>{message}</p>

            <button type="submit">Register!</button>
          </form>
      </>
    );
};

export default RegisterFrom