import { Navigate, createBrowserRouter } from 'react-router-dom';

import { UserLoader } from './loaders/UserLoader';
import { Login, Register, Home } from '../pages';
import { Base, BaseAuth } from '../layouts';
import App from '../App';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
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
                        element: <Navigate to='/login' replace />
                    },
                ]
            },
            {
                element: <BaseAuth />,
                loader: UserLoader,
                children: [
                    {
                        path: '/home',
                        element: <Home />,
                    },
                    {
                        path: '*',
                        element: <Navigate to='/home' replace />
                    },
                ]
            },
            {
                path: '*',
                element: <Navigate to='/login' replace />
            }
        ]
    },
]);

export default router;
