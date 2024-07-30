import { getUserDetail } from "../helpers/getUserDetail.js";
import sendMail from "../helpers/sendMail.js";
import { Project } from "../models/projectModel.js";
import { User } from "../models/userModel.js";

const deleteProject = async (req, res) => {
    try {
        const { id } = req.body;

        const token = req.cookies.token || "";

        const user = await getUserDetail(token);

        if (!user) {
            return res.status(401).json({
                message: 'Session logout',
                error: true
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found',
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

        await Project.deleteOne({ _id: id });

        if (user.userType === 'Admin') {
            const subject = 'Project Deleted on managemento';
            const text = `Hi! ${owner.name} , your project ${project.projectName} was deleted by admin . `
            await sendMail(owner.email, subject, text);
        }

        return res.status(200).json({
            message: 'Deleted Successfully',
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true
        });
    }
};

export default deleteProject;
