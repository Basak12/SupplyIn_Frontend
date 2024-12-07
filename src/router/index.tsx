import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import allRouteItems from "./routeItems";

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

    const routeElements = Object.values(allRouteItems).flat().map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
    ));

    return (
        <>
            <Routes>
                {routeElements}
            </Routes>
        </>
    );
};

export default AppRouter;
/*
 {pathname === '/' ? null : <Header pageName={pathnameConverter(pathname)} />}
 */