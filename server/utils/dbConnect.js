import mongoose from "mongoose";
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Successfully connected to MONGODB.`);
    } catch (error) {
        console.log(`MONGODB error : ${error.message}`);
    }
};
export default dbConnect;
