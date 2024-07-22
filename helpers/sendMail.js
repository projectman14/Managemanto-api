import nodemailer from 'nodemailer';

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_USER,
                pass: process.env.APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.APP_USER,
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return error
            } else {
                console.log('Email sent:', info.response);
                return info.response
            }
        });
    } catch (err) {
        return err
    }
}

export default sendMail
