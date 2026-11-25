import mongoose from "mongoose";

export async function connectDB() { 
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from your .env file");
    }
         await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Portfolio",
        });

        console.log("MongoDB connected successfully");

        const collections = [
            "contacts",
            "projects",
            "educations",
            "users",
        ];

        for (const name of collections) {
            const exists = await mongoose.connection.db.listCollections({ name }).hasNext();

            if (!exists) {
                await mongoose.connection.db.createCollection(name);
            }
        }

        console.log("Portfolio collections are ready!");
}