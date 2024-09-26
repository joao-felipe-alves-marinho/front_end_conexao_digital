import { useState } from 'react';
import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { Container } from '@mui/material';

import { isAuthenticated } from '../services/api/authService/AuthService';
import { IUser } from '../services/api/userService/UserService';

export interface IUserContext {
    user?: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export function BaseAuth() {
    const [user, setUser] = useState<IUser | null>(useLoaderData() as IUser);
    
    if (isAuthenticated()) {
        return (
            <Container maxWidth='lg'>
                <Outlet context={{user, setUser} satisfies IUserContext } />
            </Container>
        )
    }
    return <Navigate to="/login" replace />
}