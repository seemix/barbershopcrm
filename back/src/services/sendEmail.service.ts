import nodemailer from 'nodemailer';
import emailTemplates from 'email-templates';
import path from 'path';

export const sendMail = async (email: string, locals = {}) => {

    const templateParser = new emailTemplates({
        views: {
            root: path.join(process.cwd(),'src', 'email-templates')
        }

    });
    const html = await templateParser.render('order', locals);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'No-reply LevelUP Barbershop',
        to: email,
        subject: 'Запись в барбершоп',
        text: 'This is a test email sent using Nodemailer with TypeScript!',
        html
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return process.exit(1);
        }
        console.log('Message sent successfully!');
    });
};