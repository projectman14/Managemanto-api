import { Project } from "../models/projectModel.js";
import { getUserDetail } from "../helpers/getUserDetail.js";

const editProjectDetail = async (req, res) => {
    try {
        const { id, githubRepoLink, thumbnail, liveHostedLink, techStack } = req.body;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found',
                error: true
            });
        }

        const token = req.cookies.token || "";

        const user = await getUserDetail(token);

        if (!user) {
            return res.status(401).json({
                message: 'Session logout',
                error: true
            });
        }

        if (user.userType !== 'Admin' && project.creatorId.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: 'Unauthorized access',
                error: true
            });
        }
        
        const updateFields = {};
        if (githubRepoLink) updateFields.githubRepoLink = githubRepoLink;
        if (thumbnail) updateFields.thumbnail = thumbnail;
        if (liveHostedLink) updateFields.liveHostedLink = liveHostedLink;
        if (techStack) updateFields.techStack = techStack;

        await Project.updateOne({ _id: id }, { $set: updateFields });

        const updatedProject = await Project.findById(id);

        return res.status(200).json({
            message: 'Project updated successfully',
            success: true,
            data: updatedProject
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        });
    }
};

export default editProjectDetail;
