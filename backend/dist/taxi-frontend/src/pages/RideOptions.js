"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Map_1 = __importDefault(require("../components/Map"));
const axios_1 = __importDefault(require("axios"));
const RideOptions = () => {
    const { state } = (0, react_router_dom_1.useLocation)();
    const { routeData } = state || {};
    const [selectedDriver, setSelectedDriver] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleConfirm = (driver) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch('http://localhost:3000/ride/confirm', {
                customer_id: routeData.customer_id,
                origin: routeData.origin,
                destination: routeData.destination,
                distance: routeData.distance,
                duration: routeData.duration,
                driver,
                value: driver.value,
            });
            navigate('/history');
        }
        catch (error) {
            console.error('Erro ao confirmar viagem:', error);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Op\u00E7\u00F5es de Viagem"),
        react_1.default.createElement(Map_1.default, { route: routeData }),
        react_1.default.createElement("ul", null, routeData.options.map((driver) => (react_1.default.createElement("li", { key: driver.id },
            react_1.default.createElement("p", null,
                driver.name,
                " - R$",
                driver.value.toFixed(2)),
            react_1.default.createElement("button", { onClick: () => handleConfirm(driver) }, "Escolher")))))));
};
exports.default = RideOptions;
