import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbConnect = mongoose.connect(`${process.env.MONGODB_URI }`);
        console.log(`Database connected : ${(await dbConnect).connection.host}`);
} catch (error) {
    console.log(error);
    process.exit(1);
}
};
export default connectDB;
