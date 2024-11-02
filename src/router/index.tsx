import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import dashboardRouteItems from './dashboardRoutes';

/*
const allRouteItems = [
    dashboardRouteItems,
]
 */

const DashboardPage = lazy(() => import('../content/Pages/Dashboard'));

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
