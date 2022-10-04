"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allowedMethods = function (req, res, next) {
    // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
    var allowedMethods = [
        "OPTIONS",
        "HEAD",
        "CONNECT",
        "GET",
        "POST",
        "PUT",
        "DELETE"
        //   ,"PATCH",
    ];
    if (!allowedMethods.includes(req.method)) {
        res.status(405).send("".concat(req.method, " not allowed."));
        return;
    }
    next();
};
exports.default = allowedMethods;
