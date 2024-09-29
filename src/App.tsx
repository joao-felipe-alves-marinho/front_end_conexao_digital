import { Outlet, } from 'react-router-dom';

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
                    <Outlet />
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}

export default App;