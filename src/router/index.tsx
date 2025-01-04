import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import allRouteItems from "./routeItems";
import LoginPage from "../content/Pages/Auth/LoginCover";
import RegisterPage from "../content/Pages/Auth/RegisterPage";
import LoadingWrapper from "../components/LoadingWrapper";
import {useAuth} from "../context/AuthContext";

const AppRouter: React.FC = () => {
    const { pathname } = useLocation();
    const { isLoggedIn, isLoading, setIsLoggedIn } = useAuth();

    if (isLoggedIn === null) {
        return <LoadingWrapper height='100%'/>;
    }

    if (isLoading) {
        return <LoadingWrapper height='100%'/>;
    }

    if(!isLoggedIn && pathname !== '/login' && pathname !== '/register') {
        return <Navigate to="/login" />;
    }

    const routeElements = Object.values(allRouteItems).flat().map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
    ));

    return (
            <Suspense fallback={<LoadingWrapper height='100%'/>}>
                <Routes>
                    {isLoggedIn && (routeElements)}
                    {isLoggedIn === false && (
                        <>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </>
                        )
                    }
                </Routes>
            </Suspense>
    );
};

export default AppRouter;
