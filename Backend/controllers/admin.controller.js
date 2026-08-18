import AdminModel from "../models/admin.model.js";
import OwnerModel from "../models/owner.model.js";
import MemberModel from "../models/member.model.js";
import WorkspaceModel from "../models/workspace.model.js";
import TaskModel from "../models/task.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// =====================================================
// ADMIN LOGIN
// =====================================================

export const AdminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const comparePassword = await bcrypt.compare(
            password,
            admin.password
        );

        if (!comparePassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        );

        res.cookie("one5workspaceadmin", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        const admindata = admin.toObject();
        delete admindata.password;

        return res.status(200).json({
            message: `Welcome Back ${admin.name}`,
            success: true,
            admin: admindata
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// =====================================================
// CURRENT ADMIN
// =====================================================

export const CurrentAdmin = async (req, res) => {
    try {

        const admin = req.admin;

        const admindata = admin.toObject();

        delete admindata.password;

        return res.status(200).json({
            message: "Current admin fetched",
            success: true,
            admin: admindata
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// =====================================================
// ADMIN LOGOUT
// =====================================================

export const AdminLogout = async (req, res) => {
    try {

        res.clearCookie("one5workspaceadmin");

        return res.status(200).json({
            message: "Admin logged out successfully",
            success: true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// =====================================================
// ADMIN DASHBOARD
// =====================================================

export const AdminDashboard = async (req, res) => {
    try {

        const totalOwners = await OwnerModel.countDocuments();

        const totalMembers = await MemberModel.countDocuments();

        const totalWorkspaces = await WorkspaceModel.countDocuments();

        const totalTasks = await TaskModel.countDocuments();

        const completedTasks = await TaskModel.countDocuments({
            status: "Completed"
        });

        const pendingTasks = await TaskModel.countDocuments({
            status: "Pending"
        });

        const inProgressTasks = await TaskModel.countDocuments({
            status: "In Progress"
        });

        const activeWorkspaces = await WorkspaceModel.countDocuments({
            status: "Active"
        });

        const closedWorkspaces = await WorkspaceModel.countDocuments({
            status: "Closed"
        });

        return res.status(200).json({
            message: "Admin dashboard fetched",
            success: true,

            stats: {
                totalOwners,
                totalMembers,
                totalWorkspaces,
                totalTasks,

                completedTasks,
                pendingTasks,
                inProgressTasks,

                activeWorkspaces,
                closedWorkspaces
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};




// =====================================================
// GET ALL OWNERS
// =====================================================

export const AllOwners = async (req, res) => {
    try {

        const owners = await OwnerModel
            .find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Owners fetched successfully",
            success: true,
            owners
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};




// =====================================================
// GET ALL MEMBERS
// =====================================================

export const AllMembers = async (req, res) => {
    try {

        const members = await MemberModel
            .find()
            .select("-password")
            .populate("workspace", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Members fetched successfully",
            success: true,
            members
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};




// =====================================================
// GET ALL WORKSPACES
// =====================================================

export const AllWorkspaces = async (req, res) => {
    try {

        const workspaces = await WorkspaceModel
            .find()
            .populate("owner", "fullname email photo")
            .populate("members", "fullname email photo")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Workspaces fetched successfully",
            success: true,
            workspaces
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};





// =====================================================
// PARTICULAR WORKSPACE
// =====================================================

export const ParticularWorkspace = async (req, res) => {
    try {

        const { id } = req.params;

        const workspace = await WorkspaceModel
            .findById(id)
            .populate("owner", "fullname email phone photo")
            .populate("members", "fullname email phone photo");

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Workspace fetched successfully",
            success: true,
            workspace
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};




// =====================================================
// ALL TASKS
// =====================================================

export const AllTasks = async (req, res) => {
    try {

        const tasks = await TaskModel
            .find()
            .populate("workspace", "title")
            .populate("assignedTo", "fullname email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



