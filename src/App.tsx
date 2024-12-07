import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import AppRouter from "./router";
import { NavigationProvider } from "./context/Navigation";
import { Box } from "@mui/material";

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <Box display="flex" height="100vh">
            {!isLoginPage && (
                <Box
                    sx={{
                        flexShrink: 0,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Sidebar />
                </Box>
            )}
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "auto",
                    backgroundColor: "#1e1e2f",
                }}
            >
                <AppRouter />
            </Box>
        </Box>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }


    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <NavigationProvider>
                    {isLoggedIn ? <AppContent /> : <Navigate to="/login" replace/>}
                </NavigationProvider>
            </Suspense>
        </Router>
    );
}

export default App;
