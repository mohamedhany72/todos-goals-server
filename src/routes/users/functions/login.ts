import express from "express";
import bcrypt from "bcrypt";
import { User, UserModel } from "../../../models/user";
import {
    createAccessToken,
    createRefreshToken
} from "../../../utils/createTokens";

import dotenv from "dotenv";
import destructureUser from "../../../utils/destructureUser";
import { createBrowser } from "../../../utils/createBrowser";
import { browserCookie, refreshCookie } from "../../../utils/manageCookies";

dotenv.config();

const { BCRYPT_PASSWORD: pepper } = process.env;

const model = new UserModel();

const login = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const email = req.body.email?.toLowerCase();
    const pswd = req.body.pswd;

    // check if email and pswd are not null
    if (email == null || pswd == null) {
        res.status(406).send("please enter email and password!");
        return;
    }

    // check if user exists in db
    const { success, load } = await model.select(email);
    if (!success) {
        res.status(404).send("User not found!");
        return;
    }

    const user = destructureUser(load as User);

    // validate pswd
    const match = await bcrypt.compare(
        pswd + pepper,
        (load as User).password as string
    );
    if (!match) {
        res.status(403).send("Wrong password!");
        return;
    }

    const access = createAccessToken(user);
    const refresh = createRefreshToken(user);
    const result = await createBrowser(refresh, user);

    // add tokens to db
    if (!result.success) {
        res.status(500).send("server side error, please try again later!");
        return;
    }

    const browser = result.browser as string;

    // refreshCookie(res, refresh as string);
    // browserCookie(res, browser as string);
    console.log("refresh: ",refresh)
    console.log("browser: ",browser)
    res.status(200).json({
        user,
        access, 
        refresh, 
        browser
    });
    return;
};

export default login;
