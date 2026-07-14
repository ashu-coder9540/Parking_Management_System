// Step-4: Create roleMiddleWare.js
const authorize = (...roles) => {
    // Check if the user has the required role(s)
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.userRole)) {
            return res.status(403).json({
                message: "Access denied, you do not have permission to perform this action",
            })
        }
        // If the user has the required role, proceed to the next middleware or route handler
        next();
    };
};

export default authorize;