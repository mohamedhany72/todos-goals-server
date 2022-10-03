import express from "express";
import { User, UserModel } from "../../../models/user";

const model = new UserModel();

const getUser = async (
    _req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user as User;

    if (!user.verified) {
        const { success, load } = await model.select(user.email);
        if (!success) {
            res.status(500).send("Server side error!");
            return;
        }

        if ((load as User).verified) {
            user.verified = true;
        }
    }

    res.status(200).json({ user });
    return;
};

export default getUser;
