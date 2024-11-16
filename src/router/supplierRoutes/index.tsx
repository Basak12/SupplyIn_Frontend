import { lazy } from "react";

const SupplierPage = lazy(() => import('../../content/Pages/Supplier'));

const supplierRouteItems = [
    {
        path: '/supplier',
        element: <SupplierPage />,
    },
];

export default supplierRouteItems;
