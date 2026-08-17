import mongoose from "mongoose"


const MemberSchema = new mongoose.Schema({

    fullname:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        default:"https://i.pinimg.com/736x/38/e6/1a/38e61af1171c63dc9bb832d271953974.jpg"
    },

    workspace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace",
        default:null
    },

    role:{
        type:String,
        default:"Member"
    }

},{timestamps:true})


const MemberModel = mongoose.model("Member", MemberSchema)
export default MemberModel;
