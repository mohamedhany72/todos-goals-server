import express from "express";
import { User } from "../../../models/user";
import { createAccessToken } from "../../../utils/createTokens";

const getAccess = (_req: express.Request, res: express.Response): void => {
    const user = res.locals.user as User;

    //  generate access token
    const access = createAccessToken(user);

    // send it back
    res.status(200).json({ access });
};

export default getAccess;
