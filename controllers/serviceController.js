const Service = require("../models/Service");

// CREATE SERVICE
const createService = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            deliveryTime,
            skills,
            image
        } = req.body;

        if (
            !title ||
            !description ||
            price === undefined ||
            !category ||
            !deliveryTime
        ) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const service = await Service.create({
            title,
            description,
            price,
            category,
            deliveryTime,
            skills: skills || [],
            image: image || "",
            freelancer: req.user.id
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ALL SERVICES
const getServices = async (req, res) => {
    try {
        const services = await Service.find()
            .populate("freelancer", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: services.length,
            services
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET SINGLE SERVICE
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate("freelancer", "name email role");

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            service
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE SERVICE
const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        if (service.freelancer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own services"
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Service updated successfully",
            service: updatedService
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// DELETE SERVICE
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        if (service.freelancer.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own services"
            });
        }

        await service.deleteOne();

        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
};