import express from "express";
import bcrypt from "bcrypt";
import { User, UserModel } from "../../../models/user";
import dotenv from "dotenv";
dotenv.config();

const { BCRYPT_PASSWORD: pepper } = process.env;

const model = new UserModel();

const deleteUser = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const pswd = req.body.pswd;
    const confirmMsg = req.body.confirmMsg;
    const reqUser = res.locals.user;

    if (confirmMsg == null || confirmMsg !== "I want to delete my account") {
        res.status(406).send(
            "please confirm that you want to delete your account!"
        );
        return;
    }

    if (pswd == null) {
        res.status(406).send("please enter password to delete your account!");
        return;
    }

    // select user
    const result = await model.select(reqUser.email);
    if (!result.success) {
        res.status(404).send("user not found");
        return;
    }

    const user = result.load as User;

    // match pswd
    const match = await bcrypt.compare(pswd + pepper, user.password as string);
    if (!match) {
        res.status(403).send("Wrong password!");
        return;
    }

    // delete user
    const { success } = await model.delete(user.id as string | number);

    // send back 200
    if (!success) {
        res.status(500).send("Server side error!");
        return;
    }

    res.clearCookie("browser");
    res.clearCookie("refresh");
    res.status(200).send("Account deleted!");
    return;
};

export default deleteUser;
