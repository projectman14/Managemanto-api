import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const userDeatils = async (req, res) => {
    try {
        const { token } = req.body
        const decode = await jwt.verify(token, process.env.JWT_SECRET)

        if(!decode){
            return res.status(400).json({
                message : 'JWT EXP',
                error : true
            }) 
        }

        const user = await User.findById(decode.id).select("-password")

        return res.status(200).json({
            message: 'User details',
            data: user,
            success: true
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export { userDeatils }