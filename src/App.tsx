import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import AppRouter from "./router";
import { NavigationProvider } from "./context/Navigation";
import { Box } from "@mui/material";
import {AuthProvider} from "./context/AuthContext";
import LoadingWrapper from "./components/LoadingWrapper";

function AppContent() {
    const location = useLocation();
    const renderSidebar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";


    return (
        <Box display="flex" height="100vh">
            {!renderSidebar && (
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
    return (
        <Router>
            <Suspense fallback={<LoadingWrapper/> }>
                <AuthProvider>
                    <NavigationProvider>
                       <AppContent />
                    </NavigationProvider>
                </AuthProvider>
            </Suspense>
        </Router>
    );
}

export default App;
