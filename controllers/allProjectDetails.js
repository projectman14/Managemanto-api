import { getUserDetail } from "../helpers/getUserDetail.js";
import { Project } from "../models/projectModel.js";
import { User } from "../models/userModel.js"

const allProjectDetails = async (req, res) => {
    try {
        const token = req.cookies.token || "";

        const user = await getUserDetail(token);

        if (!user) {
            return res.status(401).json({
                message: 'Session logout',
                error: true
            });
        }

        if (user.userType !== 'Admin') {
            return res.status(401).json({
                message: 'unauthorised',
                error: true
            })
        }

        const projects = Project.find()

        return res.status(200).json({
            message: 'All projects details',
            data: projects
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default allProjectDetails