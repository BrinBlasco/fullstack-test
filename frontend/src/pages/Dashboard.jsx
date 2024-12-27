
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDataForm from "../components/UserDataForm";

const Dashboard = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                console.log("No token");
                //window.location.href = '/';
                return;
            }
            try {
                const res = await axios.get("http://localhost:5000/auth/protected", {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setData(res.data);
            } catch (err) {
                console.log(err);
                window.location.href = '/';
            }
        };
        fetchData();
    });

    return (
        <div style={ {width: "100%", placeItems: "center"} }>
            <h1>Welcome to the Dashboard</h1>

            <div>{data}</div>

        </div>
    );
};

export default Dashboard;