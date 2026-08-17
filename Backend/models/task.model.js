import mongoose, { trusted } from "mongoose"


const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },

    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Progress", "Review", "Completed", "Rejected"],
        default: "Pending"
    },
    dueDate: {
        type: Date,
        required: true
    },

    submissionUrl: {
        type: String,
        default: null,
    },

    submissionNote: {
        type: String,
        default: null,
    },

    submittedAt: {
        type: Date,
        default: null,
    },
    
    rejectionNote: {
        type: String,
        default: null,
    },

}, { timestamps: true })

const TaskModel = mongoose.model("Task", TaskSchema)
export default TaskModel;
