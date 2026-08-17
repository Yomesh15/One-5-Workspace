import OwnerModel from "../models/owner.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../config/nodemailer.js";
import OTPModel from "../models/otp.model.js"
import WorkspaceModel from "../models/workspace.model.js";
import TaskModel from "../models/task.model.js";
import MemberModel from "../models/member.model.js";


// register owner
export const RegisterOwner = async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        if (!fullname || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const phoneexist = await OwnerModel.findOne({ phone })

        if (phoneexist) {
            return res.status(400).json({ message: "Phone Number already exist", success: false })
        }

        const emailexist = await OwnerModel.findOne({ email })

        if (emailexist) {
            return res.status(400).json({ message: "Email already exist", success: false })
        }

        if (phone.length != 10) {
            return res.status(400).json({ message: "Invalid Phone Number", success: false })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password should be more than 6 characters", success: false })
        }

        const hashpassword = await bcrypt.hash(password, 11)

        await OwnerModel.create({ fullname, email, phone, password: hashpassword })


        return res.status(201).json({ message: "Account Created Successfully", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// login owner
export const LoginOwner = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        if (phone) {
            let exist = await OwnerModel.findOne({ phone })
            if (!exist) {
                return res.status(400).json({ message: "Phone Number not exist", success: false })
            }
        }


        if (email) {
            const exist = await OwnerModel.findOne({ email })
            if (!exist) {
                return res.status(400).json({ message: "Email not exist", success: false })
            }
        }

        const owner = await OwnerModel.findOne({
            $or: [
                { email: email || "" },
                { phone: phone || "" },
            ]
        })

        if (!owner) {
            return res.status(400).json({ message: "Owner not found", success: false })
        }

        const comparepassword = await bcrypt.compare(password, owner.password)

        if (!comparepassword) {
            return res.status(400).json({ message: "Wrong Credentials", success: false })
        }

        const token = await jwt.sign(
            { id: owner._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        )

        res.cookie("ownertoken", token)

        let ownerdata = owner.toObject()
        delete ownerdata.password;

        return res.status(200).json({ message: `Welcome Back ${owner.fullname}`, success: true, token, owner: ownerdata })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// logout owner
export const LogoutOwner = async (req, res) => {
    try {

        res.clearCookie("ownertoken")

        return res.status(200).json({ message: "Logged out successfully", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// current owner
export const CurrentOwner = async (req, res) => {
    try {
        const owner = req.owner;

        let ownerdata = owner.toObject()
        delete ownerdata.password;

        return res.status(200).json({ message: "Current Owner Fetched", success: true, owner: ownerdata })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}




// forgotpassword send otp to mail 
export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const emailexist = await OwnerModel.findOne({ email });

        if (!emailexist) {
            return res.status(400).json({ message: "Owner not found", success: false });
        }

        await OTPModel.deleteMany({ email });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Password Reset OTP for Owner",
            html: `
                <div>
                    <h2>Password Reset</h2>
                    <p>Your OTP for resetting your password is:</p>

                    <h1>${otp}</h1>

                    <p>This OTP will expire in 5 minutes.</p>

                    <p>If you did not request this, please ignore this email.</p>
                </div>
            `
        });

        await OTPModel.create({
            email,
            otp
        });

        return res.status(200).json({ message: "Check your mail", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



// verify otp 
export const VerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email & OTP is required", success: false });
        }

        const owner = await OwnerModel.findOne({ email })

        if (!owner) {
            return res.status(400).json({ message: "Owner not found", success: false });
        }

        const otpdata = await OTPModel.findOne({ email })

        if (!otpdata) {
            return res.status(400).json({ message: "OTP Expired", success: false });
        }

        const otpAge = Date.now() - new Date(otpdata.createdAt).getTime();

        if (otpAge > 5 * 60 * 1000) {
            await OTPModel.deleteMany({ email });

            return res.status(400).json({ message: "OTP Expired", success: false });
        }

        if (otpdata.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        await OTPModel.deleteMany({ email })

        return res.status(200).json({ message: "OTP Verified", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// change password 
export const UpdatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email & Password is required", success: false });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be more than 6 characters", success: false });
        }

        const owner = await OwnerModel.findOne({ email })

        if (!owner) {
            return res.status(400).json({ message: "Owner not found", success: false });
        }

        const hashpassword = await bcrypt.hash(password, 11)

        await OwnerModel.findOneAndUpdate({ email }, { password: hashpassword })

        return res.status(200).json({ message: "Password Changed", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// create workspace
export const CreateWorkspace = async (req, res) => {
    try {
        const { title, description, members } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const newworkspace = await WorkspaceModel.create({ owner: req.owner._id, title, description, members })

        return res.status(200).json({ message: "Workspace Created Successfuly", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}




// delete workspace 
export const DeleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;

        const workspace = await WorkspaceModel.findByIdAndDelete(id)

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Workspace Deleted Successfully", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// add member to workspace
export const AddMemberToWorkspace = async (req, res) => {
    try {
        const { memberid, id } = req.body;

        if (!memberid || !id) {
            return res.status(400).json({ message: "Member ID and Workspace ID are required", success: false });
        }

        const workspace = await WorkspaceModel.findByIdAndUpdate(
            id,
            {
                $addToSet: {
                    members: memberid,
                },
            },
            { new: true }
        );

        if (!workspace) {
            return res.status(400).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Member added to workspace", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// remove member from workspace
export const RemoveMemberFromWorkspace = async (req, res) => {
    try {
        const { memberid, id } = req.body;

        if (!memberid || !id) {
            return res.status(400).json({ message: "Member ID and Workspace ID are required", success: false });
        }

        const workspace = await WorkspaceModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    members: memberid,
                },
            },
            { new: true }
        );

        if (!workspace) {
            return res.status(400).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Member removed from workspace", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// update workspace details
export const UpdateWorkspace = async (req, res) => {
    try {
        const { id } = req.body;
        const { title, description, photo } = req.body;

        const workspace = await WorkspaceModel.findByIdAndUpdate(
            id,
            { title, description, photo },
            { new: true }
        )

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Workspace Updated Successfully", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// all workspaces created by logged in owner
export const AllWorkspaces = async (req, res) => {
    try {

        const workspaces = await WorkspaceModel
            .find({ owner: req.owner._id })
            .populate("owner", "fullname email photo")
            .populate("members", "fullname email photo")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "All Workspaces fetched", success: true, workspaces });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// get particular workspace 
export const ParticularWorkspace = async (req, res) => {
    try {
        const { id } = req.params;

        const workspace = await WorkspaceModel.findById(id).populate("owner", "fullname email photo").populate("members", "fullname email photo");

        if (!workspace) {
            return res.status(400).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Particular Workspace fetched", success: true, workspace });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// create task
export const CreateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, assignedTo, dueDate } = req.body;

        if (!title || !description || !assignedTo || !dueDate) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const workspace = await WorkspaceModel.findById(id);

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found", success: false });
        }

        const member = await MemberModel.findById(assignedTo);

        if (!member) {
            return res.status(404).json({ message: "Member not found", success: false });
        }

        if (
            !workspace.members.some((memberId) => memberId.toString() === assignedTo.toString())) {
            return res.status(400).json({ message: "Member does not belong to this workspace", success: false });
        }


        if (new Date(dueDate) <= new Date()) {
            return res.status(400).json({ message: "Due date must be a future date", success: false });
        }

        const task = await TaskModel.create({
            title,
            description,
            assignedTo,
            dueDate,
            workspace: id,
            createdBy: req.owner._id
        });

        return res.status(201).json({ message: "Task Created and Assigned", success: true, task });

    } catch (error) {
        console.log("CreateTask Error:", error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



// get all tasks by logged in owner
export const OwnerTasks = async (req, res) => {
    try {

        const tasks = await TaskModel
            .find({ createdBy: req.owner._id })
            .populate("assignedTo", "fullname email phone photo")
            .populate("workspace", "title description")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "Owner tasks fetched", success: true, tasks });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// get all team members of all workspaces 
export const TeamMembers = async (req, res) => {
    try {
        const members = await WorkspaceModel.find({ owner: req.owner._id }).populate("members")

        return res.status(200).json({ message: "Team Members fetched", success: true, members });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// fetch particulaar task 
export const ParticularTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await TaskModel.findById(id)
            .populate("workspace", "title description")
            .populate("assignedTo", "fullname email phone photo")
            .populate("createdBy", "fullname email phone photo");

        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        if (task.createdBy._id.toString() !== req.owner._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to view this task", success: false });
        }

        return res.status(200).json({ message: "Task fetched successfully", success: true, task });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};




// acdept or reject the task 
export const ReviewTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { action, rejectionNote } = req.body;

        if (!["accept", "reject"].includes(action)) {
            return res.status(400).json({ message: "Invalid action", success: false });
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        if (task.createdBy.toString() !== req.owner._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to review this task", success: false });
        }

        if (task.status !== "Review") {
            return res.status(400).json({ message: "Only tasks under review can be reviewed", success: false });
        }

        if (action === "reject") {
            if (!rejectionNote || !rejectionNote.trim()) {
                return res.status(400).json({ message: "Rejection note is required", success: false, });
            }

            task.status = "Rejected";
            task.rejectionNote = rejectionNote.trim();

            await task.save();

            return res.status(200).json({ message: "Task rejected successfully", success: true, task });
        }

        task.status = "Completed";
        task.rejectionNote = null;

        await task.save();

        return res.status(200).json({ message: "Task accepted successfully", success: true, task });

    } catch (error) {
        console.log("Review Task Error:", error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};




// update task repsonse 
export const UpdateTaskResponse = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;

        if (!["Completed", "Rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid task status" });
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (task.status !== "Review") {
            return res.status(400).json({ success: false, message: "Only tasks under review can be accepted or rejected" });
        }

        if (status === "Rejected") {
            if (!note || !note.trim()) {
                return res.status(400).json({ success: false, message: "Rejection note is required" });
            }

            task.status = "Rejected";
            task.rejectionNote = note.trim();
        }

        if (status === "Completed") {
            task.status = "Completed";
            task.rejectionNote = null;
        }

        await task.save();

        const updatedTask = await TaskModel.findById(id)
            .populate("assignedTo", "fullname email phone photo role")
            .populate("createdBy", "fullname email phone photo role")
            .populate("workspace", "title description photo status");


        return res.status(200).json({
            success: true,
            message:
                status === "Completed"
                    ? "Task accepted successfully"
                    : "Task rejected successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



// 