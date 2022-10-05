import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../models/user";

dotenv.config();

const { CSRF_SECRET } = process.env;

const csrfProtection = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const token = req.body._csrf;
    const user = res.locals.user as User;
    console.log("csrf token: ", token)
    if (!token) {
        res.status(403).send("Invalid CSRF token!");
        return;
    }

    jwt.verify(token as string, CSRF_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(403).send("Invalid CSRF token!");
            return;
        }
        if (
            (decoded as jwt.JwtPayload).type !== "csrf" ||
            (decoded as jwt.JwtPayload).id != user.id
        ) {
            res.status(401).send("you are not authorized");
            return;
        }
        next();
    });
};

export default csrfProtection;
