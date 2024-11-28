"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_leaflet_1 = require("react-leaflet");
const Map = ({ route }) => {
    return (react_1.default.createElement(react_leaflet_1.MapContainer, { center: route.start, zoom: 13, style: { height: '400px', width: '100%' } },
        react_1.default.createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
        react_1.default.createElement(react_leaflet_1.Marker, { position: route.start }),
        react_1.default.createElement(react_leaflet_1.Marker, { position: route.end }),
        react_1.default.createElement(react_leaflet_1.Polyline, { positions: route.path })));
};
exports.default = Map;
