import React from 'react';
import { useLoaderData } from 'react-router-dom';

interface LoaderData {
    username: string;
}

const Home: React.FC = () => {
    const { username } = useLoaderData() as LoaderData;

    return (
        <div>
            <header>
                <h1>Welcome, {username}!</h1>
            </header>
            <main>
                <p>This is the home page.</p>
            </main>
        </div>
    );
};

export default Home;