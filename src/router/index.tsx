import React, {lazy, Suspense, useEffect, useState} from "react";
import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import Header from "../components/Header";
import allRouteItems from "./routeItems";
import LoginPage from "../content/Pages/Auth/LoginCover";
import RegisterPage from "../content/Pages/Auth/RegisterPage";

const AppRouter: React.FC = () => {
    const { pathname } = useLocation();
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
    if(isLoggedIn === false) {
        return (
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Routes>
        )
    }

    const routeElements = Object.values(allRouteItems).flat().map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
    ));

//todo login, logout yapınca router elementlerini bulamıyor

    return (
        <>
            <Routes>
                {isLoggedIn === true && routeElements}
            </Routes>
        </>
    );
};

export default AppRouter;
/*
 {pathname === '/' ? null : <Header pageName={pathnameConverter(pathname)} />}
   const pathnameConverter = (pathname: string) => {
        switch (pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/profile':
                return 'Profile';
            case '/user':
                return 'User';
            case '/products':
                return 'Products';
            case '/supplier':
                return 'Supplier';
            case '/purchase':
                return 'Purchase';
            case '/purchase/list':
                return 'Purchase';
            case '/purchase/create':
                return 'Create Purchase';
            default:
                return 'Unknown Page';
        }
    };
 */