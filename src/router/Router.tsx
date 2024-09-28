import { Navigate, createBrowserRouter } from 'react-router-dom';

import { UserLoader } from './loaders/UserLoader';
import { Login, Register, Home } from '../pages';
import { Base, BaseAuth} from '../layouts';


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
            {
                path: '',
                element: <Navigate to="/login" replace />
            },
        ]
    },
    {
        element: <BaseAuth />,
        loader: UserLoader,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />
            },
        ]
    }
]);

export default router;
