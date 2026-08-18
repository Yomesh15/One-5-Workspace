import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      default: "https://i.pinimg.com/736x/40/3f/16/403f16e25e2d5b58f14a8730a31508e9.jpg",
    },

  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", AdminSchema);
export default AdminModel;