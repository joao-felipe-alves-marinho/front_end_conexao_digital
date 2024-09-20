import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Light from './themes/Light.ts';
import { ptBR } from 'date-fns/locale';
import router from './router/Router';



function App() {

  return (
    <>
      <ThemeProvider theme={Light}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider >
    </>
  );
}

export default App;