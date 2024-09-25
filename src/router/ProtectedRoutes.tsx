import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/api/authService/AuthService';

export default function ProtectedRoutes() {
    if (isAuthenticated()) {
        return <Outlet />;
    }
    return <Navigate to="/login" replace />
}