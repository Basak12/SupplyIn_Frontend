import { lazy } from "react";

const DashboardPage = lazy(() => import('../../content/Pages/Dashboard'));

const dashboardRouteItems = [
    {
        path: '/dashboard',
        element: <DashboardPage />
    },
]


export default dashboardRouteItems;
