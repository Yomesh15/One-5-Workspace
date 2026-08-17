import MemberModel from "../models/member.model.js";
import jwt from "jsonwebtoken"


const isMember = async (req, res, next) => {
    try {
        const token = req.cookies.membertoken;

        if(!token){
            return res.status(400).json({ message: "Login Session Expired", success:false })
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded){          
            return res.status(400).json({ message: "Invalid or Expired Token", success:false })
        }

        const member = await MemberModel.findById(decoded.id)

        if(!member){
            return res.status(400).json({ message: "Member not found", success:false })
        }

        req.member = member;

        next()

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success:false })
    }
}


export default isMember;
