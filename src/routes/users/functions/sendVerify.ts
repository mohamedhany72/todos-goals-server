import express from "express";
import sendVerificationEmail from "../../../utils/sendVerify";
import { User, UserModel } from "../../../models/user";

const model = new UserModel();

const sendVerify = async (
    _req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user as User;
    const { success, load } = await model.select(user.email);

    if (!success) {
        res.status(404).send("User not found");
        return;
    }

    if (user.verified || (load as User).verified) {
        res.status(200).send("user already verified!");
        return;
    }

    sendVerificationEmail(user);
    res.status(200).send("Verification email is sent!");
    return;
};

export default sendVerify;
