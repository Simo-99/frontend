import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import React from "react";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        console.log("logging out")
        navigate(0)
    }, []);

    return (

        <Navigate to={{ pathname: '/login' }} />

    );

}

export default Logout