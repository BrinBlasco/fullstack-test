
import React, { useEffect, useState } from "react";
import axios from "../../../AxiosConfig";

const Dashboard = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/auth/protected");
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    });

    const callApi = async () => {
        const res = await axios.get('/auth/protected/address');
        console.log(res);
    };


    return (
        <div style={ {width: "100%", placeItems: "center"} }>
            <h1>Welcome to the Dashboard</h1>

            <div>{data}</div>
            
            <button onClick={callApi}>Click Me</button>
        </div>
    );
};

export default Dashboard;