import React from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import sidebarItems from "./sidebarItems";

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <Box
            sx={{
                backgroundColor: "#16223b",
                width: 220,
                height: "100vh",
                color: "#cacbcc",
                display: "flex",
                flexDirection: "column",
                px:2,
            }}
        >
            <img
                src="/images/logo.png"
                alt="Brand Logo"
            />
            <List>
                {Object.entries(sidebarItems).map(([section, items]) =>
                    items.map((item) => (
                        <ListItem
                            key={item.label}
                            component={Link}
                            to={item.path}
                            sx={{
                                color: location.pathname === item.path ? "#b4c2b4" : "white",
                                backgroundColor: location.pathname === item.path ? "#333f58" : "transparent",
                                borderRadius: 2,
                                marginBottom: 1,
                                textDecoration: "none",
                                "&:hover": {
                                    backgroundColor: "#333f58",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit" }}>{<item.icon />}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
};

export default Sidebar;
