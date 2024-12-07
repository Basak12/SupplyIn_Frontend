import { lazy } from "react";

const RegisterPage = lazy(() => import('../../content/Pages/Auth/RegisterPage'));
const LoginPage = lazy(() => import('../../content/Pages/Auth/LoginCover'));

const authRouteItems = [
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
];

export default authRouteItems;
