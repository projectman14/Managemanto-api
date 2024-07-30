import { Project } from "../models/projectModel.js";
import { getUserDetail } from "../helpers/getUserDetail.js";
import sendMail from "../helpers/sendMail.js";
import { User } from "../models/userModel.js";

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

        const owner = await User.findById(project.creatorId)

        const updateFields = {};
        if (githubRepoLink) updateFields.githubRepoLink = githubRepoLink;
        if (thumbnail) updateFields.thumbnail = thumbnail;
        updateFields.liveHostedLink = liveHostedLink;
        if (techStack) updateFields.techStack = techStack;

        await Project.updateOne({ _id: id }, { $set: updateFields });

        const updatedProject = await Project.findById(id);

        if (user.userType === 'Admin') {
            const subject = 'Project Edited By Admin';
            const text = `Hey ${owner.name} your project ${updatedProject.projectName} was edited by Admin . New Project Details are ${updateFields?.githubRepoLink ? `Github Repo Link : ${updateFields.githubRepoLink}` : ''} , ${updateFields?.liveHostedLink ? `Live Hosted Link : ${updateFields.liveHostedLink}` : ''} , ${updateFields?.thumbnail ? `Thumbnail you have to check it on website` : ''} , ${updateFields?.techStack ? `Tech Stack : ${updateFields.techStack.map((tech , index) => (`${tech}`))}` : ''}`

            await sendMail(owner.email, subject, text);
        }

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
