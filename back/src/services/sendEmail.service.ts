import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';
import path from 'path';

export const sendMail = async (email: string) => {
    // create reusable transporter object using the default SMTP transport
    // const transporter = nodemailer.createTransport({
    //     host: 'mail.levelupbalti.com',
    //     port: 465,
    //     secure: false,
    //     auth: {
    //         user: 'info@levelupbalti.com',
    //         pass: 'lvlUP23',
    //     },
    // });
    const templateParser = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }

    });
    const HTML = await templateParser.render('11',{});
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

// define message options
    const mailOptions = {
        from: 'No-reply LevelUP Barbershop',
        to: email,
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer with TypeScript!',
        html: '<h2 style="font-family: Arial,serif font-size: 30px">Jazz-Rock</h2>'
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return process.exit(1);
        }
        console.log('Message sent successfully!');
        // console.log('Server responded with "%s"', error.info.response);
    });
}
