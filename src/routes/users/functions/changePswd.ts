import express from "express";
import { UserModel, User } from "../../../models/user";
import bcrypt from "bcrypt";
import schema from "../../../utils/schema";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD: pepper } = process.env;

const model = new UserModel();

const changePswd = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const oldUser = res.locals.user as User;
    const oldPswd = req.body.opswd;
    const pswd = req.body.pswd;
    const cpswd = req.body.cpswd;

    const result = await model.select(oldUser.email);

    const user = result.load as User;

    if (!result.success) {
        res.status(404).send("User not found!");
        return;
    }

    const match = await bcrypt.compare(
        oldPswd + pepper,
        user.password as string
    );
    if (!match) {
        res.status(406).send("Wrong old password!");
        return;
    }

    // compare new password
    if (pswd == null || cpswd == null || cpswd !== pswd) {
        res.status(406).send("passwords not match!");
        return;
    }

    if (!schema.validate(pswd)) {
        res.status(406).send(
            "password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!"
        );
        return;
    }

    // change password in db
    const { success } = await model.changePassword(
        user.id as string | number,
        cpswd
    );

    // error handling
    if (!success) {
        res.status(500).send("Server side error!");
        return;
    }

    // send successfull response
    res.status(200).send("Password changed!");
    return;
};

export default changePswd;
