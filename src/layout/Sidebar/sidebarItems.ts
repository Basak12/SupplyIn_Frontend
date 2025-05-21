import dashboardSidebarItems from "./dashboardSidebarItems";
import profileSidebarItems from "./profileSidebarItems";
import productSidebarItems from "./productSidebarItems";
import supplierSidebarItems from "./supplierSidebarItems";
import purchaseSidebarItems from "./purchaseSidebarItems";
import aiChatSidebarItems from "./aiChatSidebarItems";

import React from "react";

type SidebarItem = {
    label: string;
    path: string;
    icon: React.ElementType;
    children?: SidebarItem[];
};

const sidebarItems: { [key: string]: SidebarItem[] } = {
    dashboard: dashboardSidebarItems,
    aiChat: aiChatSidebarItems,
    purchase: purchaseSidebarItems,
    products: productSidebarItems,
    supplier: supplierSidebarItems,
    profile: profileSidebarItems,
};

export default sidebarItems;
