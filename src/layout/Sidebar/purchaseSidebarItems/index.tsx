import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PaymentsIcon from '@mui/icons-material/Payments';
import InventoryIcon from '@mui/icons-material/Inventory';

const purchaseSidebarItems = [
    {
        label: "Purchases",
        path: "/purchase",
        icon: ShoppingBasketIcon,
        children: [
            {
                label: "View Purchases",
                path: "/purchase/list",
                icon: InventoryIcon,
            },
            {
                label: "Create Purchase",
                path: "/purchase/create",
                icon: PaymentsIcon,
            },
        ],
    },
];

export default purchaseSidebarItems;
