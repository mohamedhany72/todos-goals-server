"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
dotenv_1.default.config();
var _a = process.env, EMAIL_ACCOUNT = _a.EMAIL_ACCOUNT, EMAIL_APP_PASSWORD = _a.EMAIL_APP_PASSWORD;
// type ReturnJson = {
//     success: boolean,
//     msg?: string
// }
var mailer = function (reciver, subject, temp, context) {
    var transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_ACCOUNT,
            pass: EMAIL_APP_PASSWORD
        }
    });
    var mailOptions = {
        from: EMAIL_ACCOUNT,
        to: reciver,
        subject: subject,
        template: temp,
        context: context
    };
    var handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path_1.default.resolve("./src/views/email"),
            defaultLayout: false
        },
        viewPath: path_1.default.resolve("./src/views/email"),
        extName: ".handlebars"
    };
    // @ts-ignore
    transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return {
                success: false,
                msg: "Error sending email: ".concat(error)
            };
        }
        console.log("Email sent: " + info.response);
        return {
            success: true,
            msg: "Email sent: ".concat(info.response)
        };
    });
};
exports.default = mailer;
