import nodemailer from 'nodemailer';
import { EmailOptions } from './interfaces';
import { config } from './config';



const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: config.mail.service,
            auth: {
                user: config.mail.user,
                pass: config.mail.password
            }
        });

        const mailOptions = {
            from: 'jacobole2000@gmail.com',
            to: emailOptions.to,
            subject: emailOptions.subject,
            html: emailOptions.message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail sent: ', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;
