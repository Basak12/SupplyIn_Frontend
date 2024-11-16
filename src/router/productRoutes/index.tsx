import { lazy } from "react";

const ProductPage = lazy(() => import('../../content/Pages/Product'));

const productRouteItems = [
    {
        path: '/products',
        element: <ProductPage />,
    },
];

export default productRouteItems;
