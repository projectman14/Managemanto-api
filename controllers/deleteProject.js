import { getUserDetail } from "../helpers/getUserDetail.js";
import { Project } from "../models/projectModel.js";

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

        await Project.deleteOne({ _id: id });

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
