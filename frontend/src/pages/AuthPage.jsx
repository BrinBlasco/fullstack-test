
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterFrom from "../components/RegisterForm";

const AuthPage = () => {
    
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin((current) => !current);

    return (
        <div style={ {textAlign: "center", padding: "20px"} }>
            {
                isLogin ? <LoginForm/> : <RegisterFrom/>
            }
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <a onClick={toggleForm} style={{ color: "skyblue", cursor: "pointer" }}> {isLogin ? "Register" : "Login"}</a>
            </p>
        </div>
    )
};

export default AuthPage;