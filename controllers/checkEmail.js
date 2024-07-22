import { User } from "../models/userModel.js"

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body

        const checkEmail = await User.findOne({ email }).select("-password")

        if (!checkEmail) {
            return res.status(400).json({
                message: 'user not exist',
                error: true
            })
        }

        return res.status(200).json({
            message: 'Email verified',
            success: true,
            data: checkEmail
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default checkEmail