import { Project } from "../models/projectModel.js";

const getAllProjectsUsingId = async (req, res) => {
    try {
        const { id } = req.body

        const projects = await Project.find({ creatorId: id });

        return res.status(200).json({
            message: 'User Data Using Id',
            data: projects,
            success: true
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default getAllProjectsUsingId