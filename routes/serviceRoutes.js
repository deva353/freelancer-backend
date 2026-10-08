const express = require("express");

const {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const protect = require("../middleware/authMiddleware");

const {
    freelancerOnly
} = require("../middleware/roleMiddleware");

const router = express.Router();


// Public routes

router.get("/", getServices);

router.get("/:id", getServiceById);


// Freelancer protected routes

router.post(
    "/",
    protect,
    freelancerOnly,
    createService
);

router.put(
    "/:id",
    protect,
    freelancerOnly,
    updateService
);

router.delete(
    "/:id",
    protect,
    freelancerOnly,
    deleteService
);


module.exports = router;