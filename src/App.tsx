import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Light from "./themes/Light.ts";
import { ptBR } from "date-fns/locale";
import router from "./router/Router";



import { useEffect, useState } from "react";
import { loginUser } from "./services/api/authService/AuthService";
import Api from "./services/api/Api";

function App() {

    return (
        <div></div>
    );
}

export default App;