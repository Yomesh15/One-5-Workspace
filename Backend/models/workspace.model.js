import mongoose from "mongoose";


const WorkspaceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Owner",
        required:true
    },

    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    }],

    photo:{
        type:String,
        default:"https://i.pinimg.com/736x/41/a8/52/41a852de9723df6e6eda83ec84657517.jpg"
    },

    status:{
        type:String,
        enum:["Active", "Closed"],
        default:"Active"
    }

},{timestamps:true})


const WorkspaceModel = mongoose.model("Workspace", WorkspaceSchema)
export default WorkspaceModel;
