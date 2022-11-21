import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getToken, getRole, UseSort } from "./utility"

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();

    return (

        allowedRoles.includes(getRole())
            ? <><Outlet /> {
                UseSort()
            }  </>
            : getToken()
                ? <><Navigate to="/players" state={{ from: location }} replace /> {UseSort()}</>
                : <Navigate to="/login" state={{ from: location }} replace />

    );



}

export default RequireAuth;
