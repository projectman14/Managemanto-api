import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const getUserDetail = async (token) => {

    if (!token) {
        return {
            meaasge: 'session out',
            logout: true
        }
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decode.id).select("-password")

    return user

}

export { getUserDetail }