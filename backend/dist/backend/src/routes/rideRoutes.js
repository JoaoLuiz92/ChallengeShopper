"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController_1 = require("../controllers/rideController");
const router = (0, express_1.Router)();
router.post('/ride/estimate', (req, res) => {
    console.log('Request Body', req.body);
    (0, rideController_1.estimateRide)(req, res);
});
router.patch('/ride/confirm', rideController_1.confirmRide);
router.get('/ride/:customer_id', rideController_1.getRides);
exports.default = router;
