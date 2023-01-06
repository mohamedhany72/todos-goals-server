import express from "express";
import { User, UserModel } from "../../../models/user";
import { updateRefresh } from "../../../utils/createBrowser";
import { refreshCookie } from "../../../utils/manageCookies";
import { createAccessToken } from "../../../utils/createTokens";
import { clearCookies } from "../../../utils/manageCookies";

const model = new UserModel();

const refresh = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const oldUser = res.locals.user as User;
    const browserObj = res.locals.browser;
    const oldRefresh = req.cookies.refresh;

    // case that user is not verified
    let user: User;
    if (!oldUser.verified) {
        const { load } = await model.select(oldUser.email);
        user = load as User;
    } else {
        user = oldUser;
    }
    // generate new tokens
    const access = createAccessToken(user as User);

    const result = await updateRefresh(
        browserObj.browser,
        user as User,
        oldRefresh,
        browserObj.id
    );

    if (!result.success && result.code === 2) {
        res.status(500).send("server side error!");
        return;
    }

    if (!result.success) {
        clearCookies(res);
        res.status(401).send(result.msg);
        return;
    }

    refreshCookie(res, result.refresh as string);

    res.status(200).json({
        user,
        access
        // refresh: result.refresh
    });
};

export default refresh;
