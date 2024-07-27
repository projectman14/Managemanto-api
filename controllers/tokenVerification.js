import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const tokenVerification = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.updateOne({ _id: decoded.id }, { isVerified: true })

        const cookieOptions = {
            http: true,
            secure: true
        }


        return res.cookie('token', token, cookieOptions).status(202).json({
            tokendata: user,
            success: true
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export default tokenVerification