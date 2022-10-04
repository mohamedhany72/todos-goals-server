"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var browserAuth = function (req, res, next) {
    var token = req.cookies.browser;
    // console.log(`authorization: ${req.headers.authorization}`)
    jsonwebtoken_1.default.verify(token, TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Token expired or not valid");
            return;
        }
        if (decoded.type !== "browser") {
            res.status(401).send("you are not authorized");
            return;
        }
        res.locals.browser = {
            id: decoded.x,
            userId: decoded.id,
            browser: decoded.code
        };
        next();
    });
};
exports.default = browserAuth;
