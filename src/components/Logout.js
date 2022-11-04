import { Navigate } from 'react-router-dom';
import { useEffect } from "react"
import React from "react";

const Logout = () => {

    useEffect(() => {
        localStorage.clear();
        console.log("logging out")
    }, []);

    return (

        <Navigate to={{ pathname: '/login' }} documentReload />

    );

}

export default Logout