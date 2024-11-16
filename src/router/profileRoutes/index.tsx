import { lazy } from "react";

const ProfilePage = lazy(() => import('../../content/Pages/Profile'));

const profileRouteItems = [
    {
        path: '/profile',
        element: <ProfilePage />,
    },
];

export default profileRouteItems;
