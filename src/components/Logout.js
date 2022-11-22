import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import { UseAxios } from "../utility"

const LOGOUT = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await UseAxios("/logout", "POST");
            localStorage.clear();
            navigate(0);
        })()
    }, [navigate]);
    return (<Navigate to='/login' />);

}

export default LOGOUT