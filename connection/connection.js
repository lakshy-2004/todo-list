import mongoose, { mongo } from "mongoose";    
import 'dotenv/config';

const connection = async() => {
    try{
        const db_url = process.env.MONGODB_URI;
        await mongoose
    .connect(db_url)
    .then(() => console.log("Database Connected Successfully -----"));
    }catch( err ){
        console.log("Database Not Connected !!!!!!! ",err);
        res.status(400).json({
            message: "Database Not Connected !!!!!!!",
        });
    }
};

export default connection;