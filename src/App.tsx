import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Light from './themes/Light.ts';
import { ptBR } from 'date-fns/locale';
import router from './router/Router';



import { useEffect, useState } from 'react';
import { loginUser } from './services/api/authService/AuthService';
import Api from './services/api/Api';

function App() {

    useEffect(() => {
        Api.get('/auth/csrf')
            .then((response) => {
                Api.defaults.headers['X-CSRFToken'] = response.data.csrfToken;
            })
            .catch((error) => {
                console.error('Failed to fetch CSRF token:', error);
            });
    }, []);

    const username = 'admin@gmail.com';
    const password = 'admin2023';

    const [loading, setLoading] = useState(false);


    const handleLogin = () => {
        setLoading(true);
        loginUser(username, password)
            .then((data) => {
                console.log('Login successful:', data);
            })
            .catch((error) => {
                console.error('Login failed:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default App;