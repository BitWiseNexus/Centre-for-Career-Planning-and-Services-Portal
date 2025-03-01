import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import User from '../models/user.model.js';

config();

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies ? req.cookies.jwt : null;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.json({ success: false, message: 'Not Authorized. Login Again.' });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.userId = user._id;
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};