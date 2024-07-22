import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true, unique: true },
    githubRepoLink: {
        type: String,
        required: true,
        match: [/^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+\/?$/, 'Invalid GitHub repository link']
    },
    thumbnail: { type: String, required: true },
    liveHostedLink: {
        type: String,
        match: [/^(https?:\/\/)?(www\.)?[A-Za-z0-9._%+-]+\.[A-Za-z]{2,}$/, 'Invalid URL']
    },
    techStack: { type: [String], default: [] }
});

const Project = mongoose.model('Project', projectSchema);

export { Project }