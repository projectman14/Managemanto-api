import bcryptjs from 'bcryptjs'
import validEmail from '../helpers/validEmail.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sendMail from '../helpers/sendMail.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        const isValidEmail = validEmail(email);

        if (!isValidEmail) {
            return res.status(400).json({
                message: 'The email is not of type @lnmiit.ac.in',
                error: true
            });
        }

        const checkEmail = await User.findOne({ email })

        if (checkEmail) {
            return res.status(400).json({
                message: "User already exits",
                error: true
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword,
            userType
        }

        const user = new User(payload)
        const userSave = await user.save()

        const tokenData = {
            id: userSave._id,
            name: userSave.name,
            email: userSave.email,
            userType: userSave.userType
        }

        const token = jwt.sign(tokenData, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

        const subject = 'Email Verification for managemento'

        const text = `Hey! Welcome tp ManageMento . To verify yourself click on the link provided in mail and then click verify User . This Will allow you to access the dashboard without login for the first and one time only! ${process.env.FRONTEND_URL}/verifyuser/${token}`

        // console.log(text)
        const MailerSender = await sendMail(userSave.email, subject, text)
        console.log(MailerSender)

        return res.status(201).json({
            message: 'User created successfully',
            data: userSave,
            token: token,
            sucess: true
        })


    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        })
    }
}

export { registerUser }