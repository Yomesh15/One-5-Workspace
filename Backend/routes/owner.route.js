import express from "express"
import { AddMemberToWorkspace, AllWorkspaces, CreateTask, CreateWorkspace, CurrentOwner, DeleteWorkspace, ForgotPassword, LoginOwner, LogoutOwner, OwnerTasks, ParticularTask, ParticularWorkspace, RegisterOwner, RemoveMemberFromWorkspace, ReviewTask, TeamMembers, UpdatePassword, UpdateTaskResponse, UpdateWorkspace, VerifyOTP } from "../controllers/owner.controller.js"
import isOwner from "../middlewares/isOwner.js"


const owner_router = express.Router()


owner_router.post("/register", RegisterOwner)
owner_router.post("/login", LoginOwner)
owner_router.post("/logout", LogoutOwner)

owner_router.get("/currentowner", isOwner, CurrentOwner)

owner_router.post("/forgotpassword", ForgotPassword)
owner_router.post("/verifyotp", VerifyOTP)
owner_router.patch("/updatepassword", UpdatePassword)

owner_router.post("/createworkspace", isOwner, CreateWorkspace)
owner_router.get("/allworkspaces", isOwner, AllWorkspaces)
owner_router.get("/particularworkspace/:id", isOwner, ParticularWorkspace)
owner_router.delete("/deleteworkspace/:id", isOwner, DeleteWorkspace)
owner_router.patch("/addmember", isOwner, AddMemberToWorkspace)
owner_router.patch("/removemember", isOwner, RemoveMemberFromWorkspace)
owner_router.patch("/updateworkspace", isOwner, UpdateWorkspace)

owner_router.get("/particulartask/:id", isOwner, ParticularTask)

owner_router.post("/createtask/:id", isOwner, CreateTask)
owner_router.get("/gettasks", isOwner, OwnerTasks)

owner_router.get("/team", isOwner, TeamMembers)

owner_router.patch("/reviewtask/:id", isOwner, ReviewTask);

owner_router.patch("/task-response/:id", isOwner, UpdateTaskResponse);


export default owner_router
