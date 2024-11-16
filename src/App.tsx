import React, { Suspense } from "react";
import "./App.css";
import Grid from "@mui/material/Grid2";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import AppRouter from "./router";
import { NavigationProvider } from "./context/Navigation";
import { Box } from "@mui/material";

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

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
                }}
            >
                <AppRouter />
            </Box>
        </Box>
    );
}

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <NavigationProvider>
                    <AppContent />
                </NavigationProvider>
            </Suspense>
        </Router>
    );
}

export default App;
