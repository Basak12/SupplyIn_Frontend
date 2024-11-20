import { lazy } from "react";

const UserPage = lazy(() => import('../../content/Pages/User'));

const userRouteItems = [
    {
        path: '/user',
        element: <UserPage />,
    },
];

export default userRouteItems;
