import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  fileName:{
    type:String,
    required:true
  },
  fileUrl:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"pending"
  }
},{timestamps:true});

export default mongoose.model("Document",documentSchema);