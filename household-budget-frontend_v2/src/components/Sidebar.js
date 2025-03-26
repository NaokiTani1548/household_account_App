"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Sidebar = () => {
    const [open, setOpen] = (0, react_2.useState)(false);
    const toggleDrawer = (isOpen) => () => {
        setOpen(isOpen);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.IconButton, { onClick: toggleDrawer(true), sx: {
                position: "absolute",
                top: 20,
                left: 20,
                backgroundColor: "orange",
                color: "white",
                "&:hover": { backgroundColor: "darkorange" },
                boxShadow: 3,
                width: 50,
                height: 50
            } },
            react_1.default.createElement(icons_material_1.Menu, null)),
        react_1.default.createElement(material_1.Drawer, { anchor: "left", open: open, onClose: toggleDrawer(false) },
            react_1.default.createElement(material_1.List, { sx: { width: 250 } },
                react_1.default.createElement(material_1.ListItem, { disablePadding: true },
                    react_1.default.createElement(material_1.ListItemButton, { component: react_router_dom_1.Link, to: "/", onClick: () => setOpen(false) },
                        react_1.default.createElement(material_1.ListItemIcon, null,
                            react_1.default.createElement(icons_material_1.Home, null)),
                        react_1.default.createElement(material_1.ListItemText, { primary: "\u30DB\u30FC\u30E0" }))),
                react_1.default.createElement(material_1.ListItem, { disablePadding: true },
                    react_1.default.createElement(material_1.ListItemButton, { component: react_router_dom_1.Link, to: "/about", onClick: () => setOpen(false) },
                        react_1.default.createElement(material_1.ListItemIcon, null,
                            react_1.default.createElement(icons_material_1.CalendarToday, null)),
                        react_1.default.createElement(material_1.ListItemText, { primary: "About" }))),
                react_1.default.createElement(material_1.ListItem, { disablePadding: true },
                    react_1.default.createElement(material_1.ListItemButton, { component: react_router_dom_1.Link, to: "/statistics", onClick: () => setOpen(false) },
                        react_1.default.createElement(material_1.ListItemIcon, null,
                            react_1.default.createElement(icons_material_1.BarChart, null)),
                        react_1.default.createElement(material_1.ListItemText, { primary: "\u7D71\u8A08" })))))));
};
exports.default = Sidebar;
