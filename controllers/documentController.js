import supabase from "../config/supabaseClient.js";
import Document from "../models/Document.js";

export const uploadDocument = async(req,res)=>{
  try{

    const file = req.file;

    if(!file){
      return res.status(400).json({message:"No file uploaded"});
    }

    const fileName = `${Date.now()}-${file.originalname}`;

    const {data,error} = await supabase.storage
      .from("documents")
      .upload(fileName,file.buffer,{
        contentType:"application/pdf"
      });

    if(error){
      return res.status(500).json({message:error.message});
    }

    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/documents/${fileName}`;

    const document = await Document.create({
      ownerId:req.user.id,
      fileName,
      fileUrl
    });

    res.status(201).json({
      message:"Document uploaded successfully",
      document
    });

  }catch(error){
    res.status(500).json({message:error.message});
  }
};