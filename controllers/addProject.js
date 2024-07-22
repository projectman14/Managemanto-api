import { Project } from "../models/projectModel.js"

const addProject = async (req, res) => {
    try {

        const { creatorId, projectName, githubRepoLink, thumbnail, liveHostedLink, techStack } = req.body

        const checkProjectName = await Project.findOne({ projectName })

        if (checkProjectName) {
            return res.status(400).json({
                message: 'Project already exist',
                error: true
            })
        }

        const payload = {
            creatorId,
            projectName,
            githubRepoLink,
            thumbnail,
            liveHostedLink,
            techStack
        }

        const project = new Project(payload)
        const projectSave = await project.save()

        return res.status(201).json({
            message: 'Project Add Successfully',
            success: true,
            data: projectSave
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default addProject