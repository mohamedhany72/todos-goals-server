import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const browserAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const token = req.cookies.browser;

    console.log(`browser token from browser auth: ${token}`)
    jwt.verify(token as string, TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(403).send("Token expired or not valid");
            return;
        }
        if ((decoded as jwt.JwtPayload).type !== "browser") {
            res.status(401).send("you are not authorized");
            return;
        }

        res.locals.browser = {
            id: (decoded as jwt.JwtPayload).x,
            userId: (decoded as jwt.JwtPayload).id,
            browser: (decoded as jwt.JwtPayload).code
        };
        next();
    });
};

export default browserAuth;
