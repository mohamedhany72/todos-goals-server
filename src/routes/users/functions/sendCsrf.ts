import express from "express";

const sendcsrf = (req: express.Request, res: express.Response): void => {
    res.status(200).json({ csrfToken: req.csrfToken() });
    return;
};

export default sendcsrf;
