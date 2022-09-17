import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

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

export {
    createRefreshToken,
    createBrowserToken,
    createAccessToken,
    createVerifyToken,
    createPswdToken
};
