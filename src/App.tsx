import { RouterProvider } from 'react-router-dom';

import router from './router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale';
import { ThemeProvider } from '@mui/material';
import Light  from './themes/Light';

function App() {

    return (
        <>
            <ThemeProvider theme={Light}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <RouterProvider router={router} />
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}

export default App;