import OwnerModel from "../models/owner.model.js";
import jwt from "jsonwebtoken"


const isOwner = async (req, res, next) => {
    try {
        const token = req.cookies.ownertoken;

        if (!token) {
            return res.status(400).json({ message: "Login Session Expired", success: false })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({ message: "Invalid or Expired Token", success: false })
        }

        const owner = await OwnerModel.findById(decoded.id)

        if (!owner) {
            return res.status(400).json({ message: "Owner not found", success: false })
        }

        req.owner = owner;

        next()

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}


export default isOwner;
