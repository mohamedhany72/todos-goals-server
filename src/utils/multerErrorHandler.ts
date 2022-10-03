import multer from "multer";
import express from "express";

const multerErrorHandler = (
    err: Error | multer.MulterError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    if (err instanceof multer.MulterError) {
        // res.statusCode = 400;
        // res.send({ code: err.code });
        res.status(400).send(err.code);
        return;
    } else if (err) {
        if (err.message === "FILE_MISSING" || err.message === "INVALID_TYPE") {
            // res.statusCode = 415;
            // res.send({ code: err.message });
            res.status(415).send(err.message);
            return;
        } else {
            // res.statusCode = 500;
            // res.send({ code: "GENERIC_ERROR" });
            res.status(500).send("Server side error!");
            return;
        }
    } else {
        next();
    }
};

export default multerErrorHandler;
