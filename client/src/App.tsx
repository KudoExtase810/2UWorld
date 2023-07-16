import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import RequireAuth from "./components/auth/RequireAuth";
import Footer from "./components/navigation/Footer";

function App() {
    useEffect(() => {
        themeChange(false);
        return () => {
            themeChange(false);
        };
    }, []);
    return (
        <>
            <main>
                <Toaster />
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth method="redirect">
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
