import express from "express";
import { UserModel, User } from "../../../models/user";
import { createPswdToken } from "../../../utils/createTokens";
import destructureUser from "../../../utils/destructureUser";
import mailer from "../../../utils/mailer";

const model = new UserModel();

const forgetPswd = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const email = req.body.email;

    // select email and check existence
    const { success, load } = await model.select(email);

    if (!success) {
        res.status(404).send("Email doesn't exist, please try to sign up!");
        return;
    }
    // generate password token
    const user = destructureUser(load as User);
    const pswdToken = createPswdToken(user.id as string | number);

    // send email to user
    mailer(user.email, "Recover Password", "forgetPswd", {
        name: user.name,
        code: pswdToken
    });

    res.status(200).send("Email sent!");
    return;
};

export default forgetPswd;
