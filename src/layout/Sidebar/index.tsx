import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    CardMedia,
    Typography,
    Button,
    Collapse,
} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import sidebarItems from "./sidebarItems";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/');
    }

    return (
        <Box
            sx={{
                backgroundColor: "#464667",
                width: 220,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                px: 2,
            }}
        >
            {/* Logo */}
            <Box mt={10} display="flex" justifyContent="center">
                <CardMedia
                    component="img"
                    height={30}
                    image="/images/logo_white.png"
                    alt="logo"
                    sx={{ width: 150 }}
                />
            </Box>
            <Divider sx={{ backgroundColor: "#8e8e8f", mt: 5, mb: 2 }} />
            <Box display="flex" alignItems="center" flexDirection="column">
                <AccountCircleIcon sx={{ color: "white", fontSize: 80 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: "whitesmoke" }}>
                    Admin
                </Typography>
                <Typography fontSize={16} fontWeight="lighter" sx={{ color: "whitesmoke" }}>
                    Ayca Kurkcu
                </Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#8e8e8f", mt: 2, mb: 2 }} />
            <List>
                {Object.entries(sidebarItems).map(([section, items]) =>
                    items.map((item) => (
                        <React.Fragment key={item.label}>
                            <ListItem
                                onClick={() => {
                                    if (item.children) {
                                        toggleSection(item.label);
                                    } else {
                                        setOpenSections((prev) => ({ ...prev, [item.label]: false }));
                                    }
                                }}
                                component={!item.children ? Link : "div"}
                                to={!item.children ? item.path : undefined}
                                sx={{
                                    color: location.pathname.startsWith(item.path) ? "#e9e9ec" : "white",
                                    backgroundColor: location.pathname.startsWith(item.path)
                                        ? "#2E2E48"
                                        : "transparent",
                                    borderRadius: 2,
                                    mb: 1,
                                    textDecoration: "none",
                                    cursor: item.children ? "pointer" : "default",
                                    "&:hover": {
                                        backgroundColor: "#2E2E48",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "inherit" }}>{<item.icon />}</ListItemIcon>
                                <ListItemText primary={item.label} />
                                {item.children &&
                                    (openSections[item.label] ? (
                                        <ExpandLessIcon sx={{ color: "white" }} />
                                    ) : (
                                        <ExpandMoreIcon sx={{ color: "white" }} />
                                    ))}
                            </ListItem>
                            {item.children && Array.isArray(item.children) && (
                                <Collapse in={openSections[item.label]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((child) => (
                                            <ListItem
                                                key={child.label}
                                                component={Link}
                                                to={child.path}
                                                sx={{
                                                    pl: 4,
                                                    color: location.pathname === child.path ? "#e9e9ec" : "white",
                                                    backgroundColor:
                                                        location.pathname === child.path ? "#2E2E48" : "transparent",
                                                    borderRadius: 2,
                                                    mb: 0.5,
                                                    textDecoration: "none",
                                                    "&:hover": {
                                                        backgroundColor: "#2E2E48",
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ color: "inherit" }}>
                                                    {<child.icon fontSize='small'/>}
                                                </ListItemIcon>
                                                <ListItemText primary={child.label} sx={{
                                                    ml:-1
                                                }} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))
                )}
            </List>
            <Box display="flex" justifyContent="center" mt="auto">
                <Button
                    variant="contained"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        backgroundColor: "whitesmoke",
                        color: "#685BFF",
                        fontWeight: "bold",
                        borderRadius: 2,
                    }}
                >
                    Logout
                </Button>
            </Box>
            <Box sx={{ mt: "auto", display: "flex", flexDirection: "column" }}>
                <Divider sx={{ backgroundColor: "#8e8e8f", mt: 5, mb: 2 }} />
            </Box>
        </Box>
    );
};

export default Sidebar;
