import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react"

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => { localStorage.clear(); navigate(0); }, []);

    return (<Navigate to={{ pathname: '/login' }} />);

}

export default Logout