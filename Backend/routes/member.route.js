import express from "express"
import { CurrentMember, ExitFromWorkspace, ForgotPassword, LoginMember, LogoutMember, MemberTasks, MemberWorkspace, ParticularTask, ParticularWorkspace, RegisterMember, SendURL, UpdatePassword, VerifyOTP } from "../controllers/member.controller.js"
import isMember from "../middlewares/isMember.js"


const member_router = express.Router()


member_router.post("/register", RegisterMember)
member_router.post("/login", LoginMember)
member_router.post("/logout", LogoutMember)

member_router.get("/currentmember", isMember, CurrentMember)

member_router.post("/forgotpassword", ForgotPassword)
member_router.post("/verifyotp", VerifyOTP)
member_router.patch("/updatepassword", UpdatePassword)


member_router.get("/memberworkspace", isMember, MemberWorkspace)
member_router.patch("/exitfromworkspace/:id", isMember, ExitFromWorkspace)

member_router.get("/membertasks", isMember, MemberTasks)

member_router.get("/particularworkspace/:id", isMember, ParticularWorkspace)

member_router.get("/particulartask/:id", isMember, ParticularTask)

member_router.patch("/sendurl/:id", isMember, SendURL)


export default member_router;
