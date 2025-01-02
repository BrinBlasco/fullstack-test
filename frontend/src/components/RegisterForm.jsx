
import { useState, useRef } from "react";
import '../styles/LogRegForms.css';
import '../../../AxiosConfig';

const RegisterFrom = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');

	const [upid, setUpid] = useState('');
	const [fName, setFname] = useState('');
	const [lName, setLname] = useState('');
	const [phone, setPhone] = useState('');
	const [bdate, setBdate] = useState('');

	const [message, setMessage] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password != repPassword) {
			setMessage("The passwords do not match.");
			return
		}

		try {
			setMessage("");
			const res = await axios.post('/auth/signup', { username, email, password, upid, fName, lName, phone, bdate });
			
			location.href = '/';

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
				<input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

				<label htmlFor="repPassword">Confirm Password</label>
				<input type="password" name="repPassword" id="repPassword" value={repPassword} onChange={(e) => setRepPassword(e.target.value)} required />

				<br />

				<label htmlFor="upid">UPID (Unique Personal Identifier)</label>
				<input type="text" id='upid' value={upid} onChange={e => setUpid(e.target.value)} required />

				<label htmlFor="firstName">First Name</label>
				<input type="text" id='firstName' value={fName} onChange={e => setFname(e.target.value)} required />

				<label htmlFor="lastName">Last Name</label>
				<input type="text" id='lastName' value={lName} onChange={e => setLname(e.target.value)} required />

				<label htmlFor="phone">Phone</label>
				<input type="text" id='phone' value={phone} onChange={e => setPhone(e.target.value)} required />

				<label htmlFor="dateOfBirth">Date of Birth</label>
				<input type="date" id='dateOfBirth' value={bdate} onChange={e => setBdate(e.target.value)} required />

				<p>{message}</p>

				<button type="submit">Register!</button>
			</form>
		</>
	);
};

export default RegisterFrom