const freelancerOnly = (req, res, next) => {
    if (req.user.role !== "freelancer") {
        return res.status(403).json({
            message: "Only freelancers can perform this action"
        });
    }

    next();
};

module.exports = {
    freelancerOnly
};