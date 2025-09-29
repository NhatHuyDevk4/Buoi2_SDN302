import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbURL = process.env.MONGODB_URL;
export const databaseConnection = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

// connect to mongodb
// Đây là phương thức promise nên mình dùng .then() và .catch() để xử lý
// mongoose.connect("mongodb+srv://lenhathuy9a6_db_user:nhathuy123@cluster0.uurb90m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err))