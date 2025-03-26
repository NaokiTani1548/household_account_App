import { BarChart, CalendarToday, Home, Menu } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (isOpen: boolean) => () => {
        setOpen(isOpen);
    };
    return (
        <>
            <IconButton 
                onClick={toggleDrawer(true)} 
                sx={{ 
                    position: "absolute", 
                    top: 20, 
                    left: 20, 
                    backgroundColor: "orange", 
                    color: "white", 
                    "&:hover": { backgroundColor: "darkorange" }, 
                    boxShadow: 3, 
                    width: 50, 
                    height: 50 
                }}
            >
                <Menu />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/" onClick={() => setOpen(false)}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="ホーム" />
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/about" onClick={() => setOpen(false)}>
                        <ListItemIcon><CalendarToday /></ListItemIcon>
                        <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/statistics" onClick={() => setOpen(false)}>
                        <ListItemIcon><BarChart /></ListItemIcon>
                        <ListItemText primary="統計" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
};
export default Sidebar;