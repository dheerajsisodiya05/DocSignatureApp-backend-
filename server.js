import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

// dotenv.config();
dotenv.config();
console.log("ENV TEST:", process.env.SUPABASE_URL);
const app = express();

app.use(cors());
app.use(express.json());

// connect routes to server
app.use("/api/auth",authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/docs",documentRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/",(req,res)=>{
    res.send("Document Signature API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});