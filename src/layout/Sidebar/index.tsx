import React from "react";
import {Box, List, ListItem, ListItemText, ListItemIcon, Divider, CardMedia, Typography, Button} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import sidebarItems from "./sidebarItems";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <Box
            sx={{
                backgroundColor: "#464667",
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
            <Box display='flex' alignItems='center' flexDirection='column'>
                <AccountCircleIcon sx={{
                    color: "white",
                    fontSize: 80,}}/>
                <Typography variant='h6' fontWeight='bold' sx={{color: 'whitesmoke'}}>Admin</Typography>
                <Typography fontSize={16} fontWeight='lighter' sx={{color: 'whitesmoke'}}>Ayca Kurkcu</Typography>
            </Box>
            <Divider sx={{backgroundColor: '#8e8e8f', mt:2, mb:2}}/>
            <List>
                {Object.entries(sidebarItems).map(([section, items]) =>
                    items.map((item) => (
                        <ListItem
                            key={item.label}
                            component={Link}
                            to={item.path}
                            sx={{
                                color: location.pathname === item.path ? "#e9e9ec" : "white",
                                backgroundColor: location.pathname === item.path ? "#2E2E48" : "transparent",
                                borderRadius: 2,
                                marginBottom: 1,
                                textDecoration: "none",
                                "&:hover": {
                                    backgroundColor: "#2E2E48",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit" }}>{<item.icon />}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))
                )}
            </List>
            <Box display='flex' justifyContent='center' marginTop="auto">
                <Button variant='outlined' startIcon={<LogoutIcon sx={{
                color: '#685BFF'}
                }/>} sx={{
                    backgroundColor: 'whitesmoke',
                    color: '#685BFF',
                    fontWeight: 'bold',
                    borderRadius: 2,
                }}>
                    Logout
                </Button>
            </Box>
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
