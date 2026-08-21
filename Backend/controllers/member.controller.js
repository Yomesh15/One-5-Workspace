import MemberModel from "../models/member.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import OTPModel from "../models/otp.model.js";
import transporter from "../config/nodemailer.js";
import WorkspaceModel from "../models/workspace.model.js";
import TaskModel from "../models/task.model.js";



// register member
export const RegisterMember = async (req, res) => {
    try {
        const { fullname, email, phone, password } = req.body;

        if (!fullname || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const phoneexist = await MemberModel.findOne({ phone })

        if (phoneexist) {
            return res.status(400).json({ message: "Phone Number already exist", success: false })
        }

        const emailexist = await MemberModel.findOne({ email })

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

        await MemberModel.create({ fullname, email, phone, password: hashpassword })

        return res.status(201).json({ message: "Account Created Successfully", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// login mmber
export const LoginMember = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        if (phone) {
            let exist = await MemberModel.findOne({ phone })
            if (!exist) {
                return res.status(400).json({ message: "Phone Number not exist", success: false })
            }
        }

        if (email) {
            let exist = await MemberModel.findOne({ email })
            if (!exist) {
                return res.status(400).json({ message: "Email not exist", success: false })
            }
        }

        const member = await MemberModel.findOne({
            $or: [
                { email: email || "" },
                { phone: phone || "" }
            ]
        })

        if (!member) {
            return res.status(400).json({ message: "Member not found", success: false })
        }

        const comparepassword = await bcrypt.compare(password, member.password)

        if (!comparepassword) {
            return res.status(400).json({ message: "Wrong Credentials", success: false })
        }

        const token = await jwt.sign(
            { id: member._id },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
        )

        res.clearCookie("membertoken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        let memberdata = member.toObject()
        delete memberdata.password;

        return res.status(200).json({ message: `Welcome Back ${member.fullname}`, success: true, token, member: memberdata })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// logout member
export const LogoutMember = async (req, res) => {
    try {

        res.clearCookie("membertoken")

        return res.status(200).json({ message: "Logged out successfully", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}



// current member
export const CurrentMember = async (req, res) => {
    try {
        const member = req.member;

        let memberdata = member.toObject()
        delete memberdata.password;

        return res.status(200).json({ message: "Current Member Fetched", success: true, member: memberdata })

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

        const emailexist = await MemberModel.findOne({ email });

        if (!emailexist) {
            return res.status(400).json({ message: "Member not found", success: false });
        }

        await OTPModel.deleteMany({ email });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Password Reset OTP for Member",
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

        const member = await MemberModel.findOne({ email })

        if (!member) {
            return res.status(400).json({ message: "Member not found", success: false });
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

        const member = await MemberModel.findOne({ email })

        if (!member) {
            return res.status(400).json({ message: "Member not found", success: false });
        }

        const hashpassword = await bcrypt.hash(password, 11)

        await MemberModel.findOneAndUpdate({ email }, { password: hashpassword })

        return res.status(200).json({ message: "Password Changed", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// in which which workspace we are joined
export const MemberWorkspace = async (req, res) => {
    try {

        const workspaces = await WorkspaceModel.find({ members: req.member._id }).populate("owner", "fullname email photo").populate("members", "fullname email photo");

        return res.status(200).json({ message: "Fetched Member Workspaces", success: true, workspaces });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// exit from the workspace 
export const ExitFromWorkspace = async (req, res) => {
    try {
        const { id } = req.params;

        const workspace = await WorkspaceModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    members: req.member._id
                }
            },
            { new: true }
        )

        if (!workspace) {
            return res.status(400).json({ message: "Workspace not found", success: false });
        }

        return res.status(200).json({ message: "Exit Successfully from workspace", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// member tasks
export const MemberTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({ assignedTo: req.member._id })
            .populate("workspace", "title description")
            .populate("createdBy", "fullname email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "Member tasks fetched", success: true, tasks });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}




// particular workspace information for member 
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



// particular task 
export const ParticularTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await TaskModel.findById(id)
            .populate("workspace", "title description")
            .populate("assignedTo", "fullname email photo")
            .populate("createdBy", "fullname email photo");

        return res.status(200).json({ message: "Task Fetched", success: true, task });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}




// send url to owner
export const SendURL = async (req, res) => {
    try {
        const { id } = req.params

        const { submissionUrl, submissionNote } = req.body;

        if (!submissionUrl) {
            return res.status(400).json({ message: "Submission URL is required", success: false });
        }

        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        if (task.assignedTo.toString() !== req.member._id.toString()) {
            return res.status(403).json({ message: "You are not assigned to this task", success: false });
        }

        task.submissionUrl = submissionUrl.trim();
        task.submissionNote = submissionNote?.trim() || null;
        task.submittedAt = new Date();
        task.status = "Review";

        await task.save();

        return res.status(200).json({ message: "Task submitted for review", success: true, task });

        return res.status(200).json({ message: "Task in review now", success: true });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}



// 