import { lazy } from "react";

const PurchasePage = lazy(() => import('../../content/Pages/Purchase/list'));
const CreatePurchasePage = lazy(() => import('../../content/Pages/Purchase/create' ));
const AdjustImportancePage = lazy(() => import('../../content/Pages/Purchase/create/AdjustImportancePage'));

const purchaseRouteItems = [
    {
        path: '/purchase/list',
        element: <PurchasePage />,
    },
    {
        path: '/purchase/create',
        element: <CreatePurchasePage />,
    },
    {
        path: '/purchase/create/adjustImportance',
        element: <AdjustImportancePage />,
    },
];

export default purchaseRouteItems;
