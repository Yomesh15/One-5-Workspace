import mongoose from "mongoose"


const OwnerSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        default: "https://i.pinimg.com/1200x/06/a4/22/06a4220eb5c4f337221ccf390c82417e.jpg"
    },

    workspace: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace"
    }],

    role: {
        type: String,
        default: "Owner"
    }


}, { timestamps: true })


const OwnerModel = mongoose.model("Owner", OwnerSchema)
export default OwnerModel;
