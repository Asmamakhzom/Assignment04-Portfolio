import mongoose from 'mongoose';

const connectDB = async ()  => {
    try {
      const uri = process.env.MONGO_URI;

      if (!uri) {
        throw new Error('MONGO_URI is missing from .env');

      }

        await mongoose.connect(uri);

        console.log('MongoDB connected successfully!');
        console.log('Database name:', mongoose.connection.name);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;