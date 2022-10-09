import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import destructureUser from "../destructureUser";
import { User } from "../../models/user";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const refreshAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const token = req.cookies.refresh;
    // console.log("refresh token from refresh auth: ", token);
    jwt.verify(token as string, TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(403).send("Token expired or not valid");
            return;
        }
        if ((decoded as jwt.JwtPayload).type !== "refresh") {
            res.status(401).send("you are not authorized");
            return;
        }
        const user = destructureUser((decoded as jwt.JwtPayload).user as User);
        res.locals.user = user;
        next();
    });
};

export default refreshAuth;
