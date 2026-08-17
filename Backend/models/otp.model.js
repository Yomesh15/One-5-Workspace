import mongoose from "mongoose";


const OTPSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    }

}, { timestamps: true })

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const OTPModel = mongoose.model("OTP", OTPSchema)
export default OTPModel;
