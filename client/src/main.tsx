import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <BrowserRouter>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </BrowserRouter>
    </>
);
