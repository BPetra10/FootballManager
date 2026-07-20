import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
    children,
    role
}) {

    const {
        isAuthenticated,
        user,
        loading
    } = useAuth();

    if (loading) {

        return null;

    }

    if (!isAuthenticated) {

        return <Navigate to="/" replace />;

    }

    if (role && user?.role !== role) {

        if (
            role === "TeamManager" &&
            user?.role === "Admin"
        ) {

            return children;

        }

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;