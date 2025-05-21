import { lazy } from "react";

const AIChatPage = lazy(() => import('../../content/Pages/ChatPage'));

const aiChatRouteItems = [
    {
        path: '/aiChat',
        element: <AIChatPage />,
    },
];

export default aiChatRouteItems;
