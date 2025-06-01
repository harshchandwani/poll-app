import mongoose, { Schema, Document } from "mongoose";

// Degine a typescript interface for the User document
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


// Create the Mongoose schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Create the model
const User = mongoose.model<IUser>('User', userSchema);

// Export the model
export default User;
