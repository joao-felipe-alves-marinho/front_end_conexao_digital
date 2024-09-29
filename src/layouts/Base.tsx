import { Container } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../services/api/authService/AuthService';

export function Base() {
    if (isAuthenticated()) {
        return <Navigate to="/home" replace />;
    }

    return (
        <Container maxWidth='sm'>
            <Outlet />
        </Container>
    );
}