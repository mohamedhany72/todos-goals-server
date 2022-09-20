import express from "express";
import { User } from "../../../models/user";
import { updateRefresh } from "../../../utils/createBrowser";
import { createAccessToken } from "../../../utils/createTokens";

const refresh = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const user = res.locals.user as User;
    const browserObj = res.locals.browser;
    const oldRefresh = req.cookies.refresh;
    // generate new tokens
    const access = createAccessToken(user);

    const result = await updateRefresh(
        browserObj.browser,
        user,
        oldRefresh,
        browserObj.id
    );

    if (!result.success && result.code === 3) {
        res.status(401).send(result.msg);
        return;
    }

    if (!result.success && result.code === 2) {
        res.status(500).send("server side error!");
        return;
    }
    const date = new Date();
    date.setHours(date.getHours() + (24*7));
    // Secure; 
    res.setHeader('Set-Cookie', `refresh=${result.refresh}; Expires=${date}; HttpOnly; Path=/`)
    res.status(200).json({
        user,
        access,
        // refresh: result.refresh
    });
};

export default refresh;
