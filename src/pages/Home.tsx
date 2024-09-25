
import { useLoaderData } from 'react-router-dom';
import { IUser } from '../services/api/userService/UserService';

export function Home() {
    const user = useLoaderData() as IUser | null;
    if (!user) {
        return <p>User not found or not logged in.</p>;
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Bem-vindo, {user?.nome}!</p>
        </div>
    );
};
