import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import dashboardRouteItems from './dashboardRoutes';

/*
const allRouteItems = [
    dashboardRouteItems,
]
 */

const DashboardPage = lazy(() => import('../content/Pages/Dashboard'));
const LoginPage = lazy(() => import('../content/Pages/Auth/LoginCover'));
const ProfilePage = lazy(() => import('../content/Pages/Profile'));

const AppRouter: React.FC = () => {
    // create user auth context. If user is not authenticated, redirect to login page like JWT ? content : LoginPage

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
