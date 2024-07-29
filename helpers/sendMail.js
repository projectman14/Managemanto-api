import nodemailer from 'nodemailer';

const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.APP_USER}`,
                pass: `${process.env.APP_PASS}`
            },
            tls: {
                ciphers: "SSLv3"
            }
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
