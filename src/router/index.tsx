import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import allRouteItems from "./routeItems";

const LoginPage = lazy(() => import('../content/Pages/Auth/LoginCover'));

const AppRouter: React.FC = () => {
    const { pathname } = useLocation();

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
            default:
                return 'Login';
        }
    };

    const routeElements = Object.values(allRouteItems).flat().map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
    ));

    return (
        <>
            {pathname === '/' ? null : <Header pageName={pathnameConverter(pathname)} />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {routeElements}
            </Routes>
        </>
    );
};

export default AppRouter;
