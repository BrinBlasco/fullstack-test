
import React, {useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                alert('Unauthorised - No token found');
                window.location.href = '/';
                return;
            }
            try {
                const res = await axios.get('http://localhost:5000/auth/protected', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(res.data);
            } catch (err) {
                console.error('Error fetching data: ', err);
                alert('Unauthorised');
                window.location.href = '/';
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>{data}</p>
        </div>
    );
};

export default Dashboard;
