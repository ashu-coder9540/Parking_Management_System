import jwt from "jsonwebtoken";
// Authentication middleware to verify JWT token
const auth = (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        // Check if token is present
        if(!token){
            return res.status(401).json({
                message: "No token",
            })
        }
    // Verify the token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    }catch (error){ // If token is invalid or expired
        return res.status(401).json({
            message: "Invalid token",
        })
    }
}

export default auth;