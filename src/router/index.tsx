import React, { lazy, Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "../components/Header";
import allRouteItems from "./routeItems";
import LoginPage from "../content/Pages/Auth/LoginCover";
import RegisterPage from "../content/Pages/Auth/RegisterPage";

const AppRouter: React.FC = () => {
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, []);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    const routeElements = Object.values(allRouteItems).flat().map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
    ));


    return (
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {isLoggedIn ? (
                        routeElements
                    ) : (
                        <>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </>
                    )}
                </Routes>
            </Suspense>
    );
};

export default AppRouter;
