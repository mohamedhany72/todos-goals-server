import mailer from "./mailer";
import { createVerifyToken } from "./createTokens";
import { User } from "../models/user";

const sendVerificationEmail = (user: User): void => {
    const verify = createVerifyToken(user);
    const temp = "verification";

    const subject = "Verify Your Account!";
    const link = `http://localhost:3001/api/users/verify/${verify}`;
    const context = {
        name: user.name,
        link
    };
    mailer(user.email, subject, temp, context);
    // console.log("sending verify")
    return;
};

export default sendVerificationEmail;
