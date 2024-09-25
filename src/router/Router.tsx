import { Navigate, createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Base from '../layouts/Base';
import { Login } from '../pages/login/Login';
import { Register } from '../pages/register/Register';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {   
        element: <Base />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '*',
                element: <Navigate to="/login" replace />
            },
        ]
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: <Navigate to="/" replace />
            },
        ]
    }
]);

export default router;
