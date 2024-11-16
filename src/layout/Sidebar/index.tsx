import React from "react";
import {Box, List, ListItem, ListItemText, ListItemIcon, Divider, CardMedia} from "@mui/material";
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
                display: "flex",
                flexDirection: "column",
                px:2,
            }}
        >
            <Box mt={10} display='flex' justifyContent='center'>
                <CardMedia component="img" height={30} image='/images/logo_white.png' alt="logo" sx={{ width: 150 }} />
            </Box>
            <Divider sx={{backgroundColor: '#8e8e8f', mt:5, mb:2}}/>
            <List>
                {Object.entries(sidebarItems).map(([section, items]) =>
                    items.map((item) => (
                        <ListItem
                            key={item.label}
                            component={Link}
                            to={item.path}
                            sx={{
                                color: location.pathname === item.path ? "#e9e9ec" : "white",
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
            <Box sx={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
            }}>
                <Divider sx={{backgroundColor: '#8e8e8f', mt:5, mb:2}}/>
            </Box>
        </Box>
    );
};

export default Sidebar;
