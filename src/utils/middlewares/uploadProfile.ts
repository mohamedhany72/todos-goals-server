import express from "express";
import upload from "../upload";
import multerErrorHandler from "../multerErrorHandler";

const uploadProfile = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    upload(req, res, (err) => {
        multerErrorHandler(err, req, res, next);
    });
};

export default uploadProfile;
