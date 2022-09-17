import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import hbs from "nodemailer-express-handlebars";

dotenv.config();

const { EMAIL_ACCOUNT, EMAIL_APP_PASSWORD } = process.env;
// type ReturnJson = {
//     success: boolean,
//     msg?: string
// }

const mailer = (
    reciver: string,
    subject: string,
    temp: string,
    context: {}
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_ACCOUNT,
            pass: EMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
        from: EMAIL_ACCOUNT,
        to: reciver,
        subject: subject,
        template: temp,
        context
    };

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./src/views/email"),
            defaultLayout: false
        },
        viewPath: path.resolve("./src/views/email"),
        extName: ".handlebars"
    };

    // @ts-ignore
    transporter.use("compile", hbs(handlebarOptions));

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return {
                success: false,
                msg: `Error sending email: ${error}`
            };
        }

        console.log("Email sent: " + info.response);
        return {
            success: true,
            msg: `Email sent: ${info.response}`
        };
    });
};

export default mailer;
