"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController_1 = require("../controllers/rideController");
const router = (0, express_1.Router)();
router.post('/ride/estimate', rideController_1.estimateRide);
router.patch('/ride/confirm', rideController_1.confirmRide);
router.get('/ride/:customer_id', rideController_1.getRides);
exports.default = router;
