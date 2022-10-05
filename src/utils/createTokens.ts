import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET, CSRF_SECRET } = process.env;

const makeid = (length: number): string => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const createRefreshToken = (user: User): string => {
    const refreshToken = jwt.sign(
        { user, type: "refresh" },
        TOKEN_SECRET as string,
        {
            expiresIn: "7d"
        }
    );

    return refreshToken;
};

const createBrowserToken = (
    user: User,
    id: string | number,
    code: string | number
): string => {
    const browserToken = jwt.sign(
        {
            id: user.id,
            type: "browser",
            x: id,
            code
        },
        TOKEN_SECRET as string
    );
    return browserToken;
};

const createAccessToken = (user: User): string => {
    const accessToken = jwt.sign(
        { user, type: "access" },
        TOKEN_SECRET as string,
        {
            expiresIn: "1h"
        }
    );
    return accessToken;
};

const createVerifyToken = (user: User): string => {
    const accessToken = jwt.sign(
        { user, type: "verify" },
        TOKEN_SECRET as string,
        {
            expiresIn: "30m"
        }
    );
    return accessToken;
};

const createPswdToken = (id: string | number): string => {
    const pswdToken = jwt.sign(
        {
            id,
            type: "pswd",
            recoverPswd: true
        },
        TOKEN_SECRET as string,
        {
            expiresIn: "30m"
        }
    );
    return pswdToken;
};

const createCsrfToken = (id: string | number): string => {
    const unique = makeid(6);
    const csrfToken = jwt.sign(
        {
            id,
            type: "csrf",
            string: unique
        },
        CSRF_SECRET as string,
        {
            expiresIn: "30m"
        }
    );
    return csrfToken;
};

export {
    createRefreshToken,
    createBrowserToken,
    createAccessToken,
    createVerifyToken,
    createPswdToken,
    createCsrfToken
};
