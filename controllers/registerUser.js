import bcryptjs from 'bcryptjs';
import validEmail from '../helpers/validEmail.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sendMail from '../helpers/sendMail.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        if (!validEmail(email)) {
            return res.status(400).json({
                message: 'The email is not of type @lnmiit.ac.in',
                error: true
            });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({
                message: "User already exists",
                error: true
            });
        }

        const adminEmails = [
            '22ucs216@lnmiit.ac.in',
            '22ucs067@lnmiit.ac.in',
            '22ucs110@lnmiit.ac.in',
            '22ucs236@lnmiit.ac.in',
            '22ucs212@lnmiit.ac.in',
            '23ucs633@lnmiit.ac.in'
        ];

        let finalUserType = 'Student';

        if (userType === 'Admin' && adminEmails.includes(email)) {
            finalUserType = 'Admin';
        }

        const hashPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));

        const payload = { name, email, password: hashPassword, userType: finalUserType };

        const userSave = await new User(payload).save();

        const token = jwt.sign(
            { id: userSave._id, name: userSave.name, email: userSave.email, userType: userSave.userType },
            `${process.env.JWT_SECRET}`,
            { expiresIn: '1h' }
        );

        const subject = 'Email Verification for Managemento';
        const text = `Hey! Welcome to Managemento. To verify yourself, click on the link provided in the email and then click "Verify User". This will allow you to access the dashboard without login for the first time only! ${process.env.FRONTEND_URL}/verifyuser/${token}`;

        await sendMail(userSave.email, subject, text);

        return res.status(201).json({
            message: 'User created successfully',
            data: userSave,
            token,
            success: true
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
};

export { registerUser };
