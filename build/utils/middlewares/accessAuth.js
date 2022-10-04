"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var destructureUser_1 = __importDefault(require("../destructureUser"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var accessAuth = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // console.log(`authorization: ${req.headers.authorization}`)
    jsonwebtoken_1.default.verify(token, TOKEN_SECRET, function (err, decoded) {
        if (err) {
            res.status(403).send("Token expired or not valid");
            return;
        }
        if (decoded.type !== "access") {
            res.status(401).send("you are not authorized");
            return;
        }
        var user = (0, destructureUser_1.default)(decoded.user);
        res.locals.user = user;
        next();
    });
};
exports.default = accessAuth;
