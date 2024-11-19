import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, allowedRoles, userRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;