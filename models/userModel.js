import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/@lnmiit\.ac\.in$/, 'Only lnmiit domain allowed'] },
    password: { type: String, required: true },
    userType: { type: String, enum: ['Student', 'Admin'], required: true },
    isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
export { User }