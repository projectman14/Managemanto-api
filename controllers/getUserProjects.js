import { getUserDetail } from "../helpers/getUserDetail.js"
import { Project } from "../models/projectModel.js"

const getUserprojects = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetail(token)

        if (!user) {
            return res.status(401).json({
                message: 'Session logout',
                error: true
            })
        }

        const projects = await Project.find({ creatorId: user?._id })

        return res.status(200).json({
            message: 'All Projects of user',
            success: true,
            data: projects
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default getUserprojects