import express from "express";
import validator from "email-validator";
import { UserModel, User } from "../../../models/user";
// import { TokenModel } from "../../../models/token";
import {
    createAccessToken,
    createRefreshToken
} from "../../../utils/createTokens";
import destructureUser from "../../../utils/destructureUser";
import schema from "../../../utils/schema";
import sendVerificationEmail from "../../../utils/sendVerify";
import { createBrowser } from "../../../utils/createBrowser";
// import { browserCookie, refreshCookie } from "../../../utils/manageCookies";

const model = new UserModel();
// const tokens = new TokenModel();

export const NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;

const register = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    //verify data
    const name = req.body.name;
    const email = req.body.email?.toLowerCase();
    const gender = req.body.gender;
    const pswd = req.body.pswd;
    const cpswd = req.body.cpswd;

    // check if email exists
    const findUser = await model.select(email);

    // const emailRes = await validate(email);

    if (findUser.success) {
        res.status(409).send("email exists, please try to login in!");
        return;
    }

    if (name == null || !NAME_REGEX.test(name)) {
        res.status(406).send("name must have at least 3 characters!");
        return;
    }

    if (email == null || !validator.validate(email)) {
        res.status(406).send("please enter a valid email!");
        return;
    }

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

    if (gender == null || (Number(gender) !== 1 && Number(gender) !== 2)) {
        res.status(406).send("you must select gender!");
        return;
    }

    // after validating the data, lets add the user
    const { success, load } = await model.add({
        name,
        email,
        password: cpswd,
        gender
    });

    if (!success) {
        res.status(500).send("Server side error, please try again later!");
        return;
    }

    const user = destructureUser(load as User);

    const access = createAccessToken(user);
    const refresh = createRefreshToken(user);

    const { browser } = await createBrowser(refresh, user);

    sendVerificationEmail(user);

    // const refreshDate = new Date();
    // refreshDate.setHours(refreshDate.getHours() + 24 * 7);

    // const browserDate = new Date();
    // browserDate.setHours(browserDate.getHours() + 365 * 7);
    // // Secure;
    // res.setHeader("Set-Cookie", [
    //     `refresh=${refresh}; Expires=${refreshDate}; HttpOnly; Path=/`,
    //     `browser=${browser}; Expires=${browserDate}; HttpOnly; Path=/`
    // ]);

    // refreshCookie(res, refresh as string);
    // browserCookie(res, browser as string);

    res.status(200).json({
        user,
        access,
        refresh,
        browser
    });

    return;
};

export default register;
