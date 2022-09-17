import express from "express";
import { TokenModel } from "../../../models/token";

const tokens = new TokenModel();

const logout = async (
    _req: express.Request,
    res: express.Response
): Promise<void> => {
    const browser = res.locals.browser;
    const user = res.locals.user;

    if (user.id != browser.userId) {
        res.status(401).send("You are not authorizied!");
        return;
    }

    const { success } = await tokens.delete(browser.id as string | number);

    if (!success) {
        res.status(500).send("Server side error!");
        return;
    }

    res.status(200).send("User logged out from this device!");
    return;
};

export default logout;
