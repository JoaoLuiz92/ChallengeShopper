"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const RequestRide_1 = __importDefault(require("./pages/RequestRide"));
const RideOptions_1 = __importDefault(require("./pages/RideOptions"));
const TravelHistoryPage_1 = __importDefault(require("./pages/TravelHistoryPage"));
const App = () => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(RequestRide_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/ride-options", element: react_1.default.createElement(RideOptions_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/history", element: react_1.default.createElement(TravelHistoryPage_1.default, null) }))));
};
exports.default = App;
