import express from "express";
import { AdminLogin, AdminLogout, CurrentAdmin, AdminDashboard, AllOwners, AllMembers, AllWorkspaces, ParticularWorkspace, AllTasks } from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/isAdmin.js"


const admin_router = express.Router();


admin_router.post("/login", AdminLogin);


admin_router.get("/currentadmin", isAdmin, CurrentAdmin);

admin_router.post("/logout", isAdmin, AdminLogout);

admin_router.get("/dashboard", isAdmin, AdminDashboard);

admin_router.get("/owners", isAdmin, AllOwners);

admin_router.get("/members", isAdmin, AllMembers);

admin_router.get("/workspaces", isAdmin, AllWorkspaces);

admin_router.get(
    "/workspace/:id",
    isAdmin,
    ParticularWorkspace
);

admin_router.get("/tasks", isAdmin, AllTasks);


export default admin_router;