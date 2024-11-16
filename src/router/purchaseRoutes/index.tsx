import { lazy } from "react";

const PurchasePage = lazy(() => import('../../content/Pages/Purchase'));

const purchaseRouteItems = [
    {
        path: '/purchase',
        element: <PurchasePage />,
    },
];

export default purchaseRouteItems;
