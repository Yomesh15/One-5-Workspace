import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken"


const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.one5workspaceadmin;

        if(!token){
            return res.status(400).json({ message: "Login Session Expired", success:false })
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded){          
            return res.status(400).json({ message: "Invalid or Expired Token", success:false })
        }

        const admin = await AdminModel.findById(decoded.id)

        if(!admin){
            return res.status(400).json({ message: "Admin not found", success:false })
        }

        req.admin = admin;

        next()

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success:false })
    }
}


export default isAdmin;
