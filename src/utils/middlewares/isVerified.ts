import express from "express";
import { User, UserModel } from "../../models/user";

const model = new UserModel();

const isVerified = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const user = res.locals.user;
    if (!user.verified) {
        // select user from db if it's not verified send back 401
        const { success, load } = await model.select(user.email);

        if (!success) {
            res.status(500).send("Server side error!");
            return;
        }

        if (!(load as User).verified) {
            res.status(401).send("User is not verified");
            return;
        }
    }

    next();
};

export default isVerified;
