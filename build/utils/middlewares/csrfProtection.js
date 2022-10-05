"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var CSRF_SECRET = process.env.CSRF_SECRET;
var csrfProtection = function (req, res, next) {
    var token = req.body._csrf;
    var user = res.locals.user;
    console.log("csrf token: ", token);
    if (!token) {
        res.status(403).send("Invalid CSRF token!");
        return;
    }
    jsonwebtoken_1.default.verify(token, CSRF_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Invalid CSRF token!");
            return;
        }
        if (decoded.type !== "csrf" ||
            decoded.id != user.id) {
            res.status(401).send("you are not authorized");
            return;
        }
        next();
    });
};
exports.default = csrfProtection;
