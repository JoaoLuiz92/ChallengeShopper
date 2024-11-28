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
const axios_1 = __importDefault(require("axios"));
const TravelHistoryPage = () => {
    const [customerId, setCustomerId] = (0, react_1.useState)('');
    const [driverId, setDriverId] = (0, react_1.useState)('');
    const [history, setHistory] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)('');
    const handleFetchHistory = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://localhost:3000/ride/${customerId}`, {
                params: { driver_id: driverId },
            });
            setHistory(response.data.rides);
        }
        catch (error) {
            setError('Erro ao carregar histórico.');
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Hist\u00F3rico de Viagens"),
        react_1.default.createElement("input", { type: "text", placeholder: "ID do Cliente", value: customerId, onChange: (e) => setCustomerId(e.target.value) }),
        react_1.default.createElement("input", { type: "text", placeholder: "ID do Motorista (opcional)", value: driverId, onChange: (e) => setDriverId(e.target.value) }),
        react_1.default.createElement("button", { onClick: handleFetchHistory }, "Buscar Hist\u00F3rico"),
        error && react_1.default.createElement("p", null, error),
        react_1.default.createElement("ul", null, history.map((ride) => (react_1.default.createElement("li", { key: ride.id },
            react_1.default.createElement("p", null, ride.date),
            react_1.default.createElement("p", null,
                ride.origin,
                " \u2192 ",
                ride.destination),
            react_1.default.createElement("p", null, ride.driver.name),
            react_1.default.createElement("p", null,
                ride.distance,
                " | ",
                ride.duration),
            react_1.default.createElement("p", null,
                "R$ ",
                ride.value.toFixed(2))))))));
};
exports.default = TravelHistoryPage;
