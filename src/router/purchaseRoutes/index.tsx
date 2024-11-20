import { lazy } from "react";

const PurchasePage = lazy(() => import('../../content/Pages/Purchase/list'));
const CreatePurchasePage = lazy(() => import('../../content/Pages/Purchase/create' ));
const AdjustImportancePage = lazy(() => import('../../content/Pages/Purchase/create/AdjustImportancePage'));
const TOPSISResultsPage = lazy(() => import('../../content/Pages/Purchase/create/TOPSISResults'));

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
    {
        path: '/purchase/create/topsisResults',
        element: <TOPSISResultsPage />,
    },
];

export default purchaseRouteItems;
