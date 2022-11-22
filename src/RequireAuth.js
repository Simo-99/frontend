import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getToken, getRole, UseSort } from "./utility"

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();

    useEffect(() => { setTimeout(() => UseSort(), 1000) }, [location])

    return (

        allowedRoles.includes(getRole())
            ? <Outlet />
            : getToken()
                ? <Navigate to="/players" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );



}

export default RequireAuth;
