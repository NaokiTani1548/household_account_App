"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const Statistics_1 = __importDefault(require("./pages/Statistics"));
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
const App = () => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Sidebar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/about", element: react_1.default.createElement(About_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/statistics", element: react_1.default.createElement(Statistics_1.default, null) }))));
};
exports.default = App;
