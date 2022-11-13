import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utility"

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();
    const user = getUser();

    console.log("checking if the route is visible by the user");
    // console.log(user.token);

    return (
        allowedRoles.includes(user?.is_admin)
            ? <Outlet />
            : user?.token
                ? <Navigate to="/players" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
