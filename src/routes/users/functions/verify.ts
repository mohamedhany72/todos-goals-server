import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../../models/user";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const model = new UserModel();

const verify = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const token = req.params.verify;

    jwt.verify(
        token as string,
        TOKEN_SECRET as string,
        async (err, decoded) => {
            if (err) {
                res.status(403).send("Token expired or not valid!");
                return;
            }
            const { success } = await model.verify(
                (decoded as jwt.JwtPayload).user.email
            );

            if (!success) {
                res.status(500).send(`Server side error`);
                return;
            }

            res.status(200).send("User verified!");
            return;
        }
    );
};

export default verify;
