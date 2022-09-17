import express from "express";
import { TokenModel } from "../../../models/token";

const tokens = new TokenModel();

const logoutAll = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user;

    const { success } = await tokens.deleteAll(user.id as string | number);
    if (!success) {
        res.send(500).send("Server side error!");
        return;
    }

    res.status(200).send("User logged out from this device!");
    return;
};

export default logoutAll;
