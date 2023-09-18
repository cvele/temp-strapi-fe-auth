import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const PrivateRoute = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Outlet />;
  }
  
  return <Navigate to="/signin" />;
};
