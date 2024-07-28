import { User } from "../models/userModel.js"

const alllUserData = async (req, res) => {
    try {

        const users = await User.find()

        if (!users) {
            return res.status(400).json({
                message: 'data not found',
                error: true
            })
        }

        return res.status(200).json({
            message: 'All Users Data',
            data: users,
            success: true
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default alllUserData