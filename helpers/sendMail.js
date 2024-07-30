import nodemailer from 'nodemailer';

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: `${process.env.APP_USER}`,
                pass: `${process.env.APP_PASS}`,
            },
            secure: true,
        });

        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        const mailOptions = {
            from: `${process.env.APP_USER}`,
            to: to,
            subject: subject,
            text: text
        };

        const info = await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent:', info.response);
                    resolve(info.response);
                }
            });
        });

        return info;
    } catch (err) {
        console.error('Error:', err);
        return err;
    }
};

export default sendMail;
