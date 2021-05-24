import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`[DBConnection] : SUCCESS. Connected to Database ${conn.connection.host}`.green)
    } catch (error) {
        console.error(`[DBConnection] : Error : ${error.message}`.red)
        process.exit(1);
    }
}


export default connectDB