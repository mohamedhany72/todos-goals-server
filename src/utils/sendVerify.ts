import mailer from "./mailer";
import { createVerifyToken } from "./createTokens";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();
const {FRONT_END_ROOT_URL} = process.env;


const sendVerificationEmail = (user: User): void => {
    const verify = createVerifyToken(user);
    const temp = "verification";

    const subject = "Verify Your Account!";
    const link = `${FRONT_END_ROOT_URL}verify/${verify}`;
    const context = {
        name: user.name,
        link
    };
    mailer(user.email, subject, temp, context);
    // console.log("sending verify")
    return;
};

export default sendVerificationEmail;
