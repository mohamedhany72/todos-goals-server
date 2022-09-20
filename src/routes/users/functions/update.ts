import express from "express";
import { User, UserModel } from "../../../models/user";
import {
    createAccessToken,
    createRefreshToken
} from "../../../utils/createTokens";
import destructureUser from "../../../utils/destructureUser";
import { updateRefresh } from "../../../utils/createBrowser";
import { NAME_REGEX } from "./register";

const model = new UserModel();

const update = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const browserObj = res.locals.browser;
    const oldRefresh = req.cookies.refresh;

    const name = req.body.name as string;
    const gender = req.body.gender;

    const oldUser = res.locals.user;

    // validate data
    if (name == null || !NAME_REGEX.test(name)) {
        res.status(406).send("name must have at least 3 characters!");
        return;
    }

    if (gender == null || (Number(gender) !== 1 && Number(gender) !== 2)) {
        res.status(406).send("you must select gender!");
        return;
    }

    // update user in db
    const { success, load, msg } = await model.update(
        oldUser.id,
        name,
        gender,
        "picurl"
    );

    if (!success) {
        res.status(500).send(`Server side error:: ${msg}`);
        return;
    }

    // destructure user object
    const user = destructureUser(load as User);

    // generate tokens
    // const refresh = createRefreshToken(user);
    const access = createAccessToken(user);

    // update tokens in db
    const result = await updateRefresh(
        browserObj.browser,
        user,
        oldRefresh,
        browserObj.id
    );
    let refresh = createRefreshToken(user);
    if (result.success) {
        refresh = result.refresh as string;
    }

    // send back the successfull response
    const date = new Date();
    date.setHours(date.getHours() + 24 * 7);
    // Secure;
    res.setHeader(
        "Set-Cookie",
        `refresh=${refresh}; Expires=${date}; HttpOnly; Path=/`
    );
    res.status(200).json({
        user,
        access
        // , refresh
    });
    return;
};

export default update;
