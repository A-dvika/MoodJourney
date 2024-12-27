import mongoose from "mongoose";

type ConnectionObject = {
    isConnected: boolean;
};

let connection: ConnectionObject = { isConnected: false };

const dbConnect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI ||'', {
           
           
        });

        connection.isConnected = !!db.connection.readyState;
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Failed to connect to the database.");
    }
};

export default dbConnect;
