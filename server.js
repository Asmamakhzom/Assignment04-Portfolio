//import express from "express";
//var express = require("express");
//var app = express();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Contact from "./backend/models/Contact.js";
import Education from "./backend/models/Education.js";
import Project from "./backend/models/Project.js";
import User from "./backend/models/User.js";
import connectDB from './backend/db.js';
import authRoutes from "./backend/routes/authRoutes.js";


import contactRoutes from './backend/routes/contactRoutes.js';
import projectRoutes from './backend/routes/projectRoutes.js';
import educationRoutes from './backend/routes/educationRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
    ]
}));

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to my Portfolio Application!");
});


app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', educationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

async function startServer() {
    try {
       
      const mongoURI = process.env.MONGO_URI;

       if (!mongoURI) {
        throw new Error("MONGO_URI is missing from your .env file");
       }

       await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully!");
    console.log('Contac model:', Contact.modelName);
    console.log('Project model:', Project.modelName);
    console.log('Education model:', Education.modelName);
    console.log('User model:', User.modelName);




      app.get("/api/project", async (req, res) => {
        try {
            const projects = await Project.find();
            res.json(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
            res.status(500).json({
                message: "Failed to fetch projects"
            });
        }

      });

    app.get("/api/project", (req, res) => {
        res.json([]);
      });

      app.get("/api/test", (req, res) => {
        res.json({
            message: "Frontend connected to backend successfully!"
        });
      });


    app.listen(3000);
       console.log("Server running at http://localhost:3000/");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }

}    


startServer();
