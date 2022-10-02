import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../../../models/user";
import schema from "../../../utils/schema";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const model = new UserModel();

const recoverPswdPut = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const token = req.body.code;
    const pswd = req.body.pswd;
    const cpswd = req.body.cpswd;

    if (token == null) {
        res.status(406).send("Code in email is required!");
        return;
    }

    // compare new password
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

    jwt.verify(
        token as string,
        TOKEN_SECRET as string,
        async (err, decoded) => {
            if (err) {
                res.status(403).send("Token expired or not valid");
                return;
            }

            if ((decoded as jwt.JwtPayload).type !== "pswd") {
                res.status(401).send("You are not authorizied!");
                return;
            }

            const id = (decoded as jwt.JwtPayload).id;

            const { success } = await model.changePassword(id, cpswd);

            if (!success) {
                res.status(500).send("Server side error!");
                return;
            }

            res.status(200).send("Password changed!");
            return;
        }
    );
};

const recoverPswdGet = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const code = req.params.code;
    if (code == null) {
        res.status(406).send("Code in email is required!");
        return;
    }

    jwt.verify(code as string, TOKEN_SECRET as string, async (err, decoded) => {
        if (err) {
            res.status(403).send("Token expired or not valid");
            return;
        }

        if ((decoded as jwt.JwtPayload).type !== "pswd") {
            res.status(401).send("You are not authorizied!");
            return;
        }
        
        console.log("_csrf: ", req.csrfToken())
        res.status(200).json({ code, csrfToken: req.csrfToken() });
        return;
    });
};

export { recoverPswdPut, recoverPswdGet };
