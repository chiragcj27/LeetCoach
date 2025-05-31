import mongoose from 'mongoose';
import connectDB from './server';

// Export the database connection function
export { connectDB };

// Export mongoose instance
export { mongoose };

// Export types
export type { IUser } from './models/user.model';

// Export models
export { UserModel } from './models/user.model';
