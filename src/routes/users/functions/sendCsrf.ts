import express from "express";
import { User } from "../../../models/user";
import { createCsrfToken } from "../../../utils/createTokens";

const sendcsrf = (_req: express.Request, res: express.Response): void => {
    const user = res.locals.user as User;
    const csrf = createCsrfToken(user.id as string | number);

    res.status(200).json({ csrfToken: csrf });
    return;
};

export default sendcsrf;
