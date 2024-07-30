import nodemailer from 'nodemailer';

const sendMail = async (to, subject, text) => {
    try {
        console.log('Preparing to send email');
        console.log('Recipient:', to);
        console.log('Subject:', subject);
        console.log('Text:', text);

        const transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.APP_USER,
                pass: process.env.APP_PASS,
            },
            secure: true,
        });

        const mailOptions = {
            from: process.env.APP_USER,
            to: to,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
};

export default sendMail;
