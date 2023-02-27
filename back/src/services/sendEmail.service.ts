// @ts-ignore
import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'mail.levelupbalti.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@levelupbalti.com',
        pass: 'lvlUP23',
    },
});

// define message options
const mailOptions = {
    from: 'info@levelupbalti.com',
    to: 'semikhalchuk@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer with TypeScript!',
    html: '<h2 style="font-size: 30px">Jazz-Rock</h2>'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error: { message: any; }, info: { response: any; }) => {
    if (error) {
        console.log('Error occurred:', error.message);
        return process.exit(1);
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
});