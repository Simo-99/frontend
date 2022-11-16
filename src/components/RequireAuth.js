import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utility"

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();
    const user = getUser();

    return (
        allowedRoles.includes(user?.role)
            ? <Outlet />
            : user?.token
                ? <Navigate to="/players" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
