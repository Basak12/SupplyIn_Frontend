import { lazy } from "react";

const PurchasePage = lazy(() => import('../../content/Pages/Purchase/list'));
const CreatePurchasePage = lazy(() => import('../../content/Pages/Purchase/create' ));

const purchaseRouteItems = [
    {
        path: '/purchase/list',
        element: <PurchasePage />,
    },
    {
        path: '/purchase/create',
        element: <CreatePurchasePage />,
    },
];

export default purchaseRouteItems;
