import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";


import "./assets/css/fabric.css";
import "./assets/css/richText.css";
import "./assets/css/style.css";
import {LangProvider} from "./contexts/LangContext.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(
    document.getElementById('root')
).render(
    <BrowserRouter>
        <LangProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </LangProvider>
    </BrowserRouter>
)
