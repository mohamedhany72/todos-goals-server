"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCsrfToken = exports.createPswdToken = exports.createVerifyToken = exports.createAccessToken = exports.createBrowserToken = exports.createRefreshToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, TOKEN_SECRET = _a.TOKEN_SECRET, CSRF_SECRET = _a.CSRF_SECRET;
var makeid = function (length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
var createRefreshToken = function (user) {
    var refreshToken = jsonwebtoken_1.default.sign({ user: user, type: "refresh" }, TOKEN_SECRET, {
        expiresIn: "7d"
    });
    return refreshToken;
};
exports.createRefreshToken = createRefreshToken;
var createBrowserToken = function (user, id, code) {
    var browserToken = jsonwebtoken_1.default.sign({
        id: user.id,
        type: "browser",
        x: id,
        code: code
    }, TOKEN_SECRET);
    return browserToken;
};
exports.createBrowserToken = createBrowserToken;
var createAccessToken = function (user) {
    var accessToken = jsonwebtoken_1.default.sign({ user: user, type: "access" }, TOKEN_SECRET, {
        expiresIn: "1h"
    });
    return accessToken;
};
exports.createAccessToken = createAccessToken;
var createVerifyToken = function (user) {
    var accessToken = jsonwebtoken_1.default.sign({ user: user, type: "verify" }, TOKEN_SECRET, {
        expiresIn: "30m"
    });
    return accessToken;
};
exports.createVerifyToken = createVerifyToken;
var createPswdToken = function (id) {
    var pswdToken = jsonwebtoken_1.default.sign({
        id: id,
        type: "pswd",
        recoverPswd: true
    }, TOKEN_SECRET, {
        expiresIn: "30m"
    });
    return pswdToken;
};
exports.createPswdToken = createPswdToken;
var createCsrfToken = function (id) {
    var unique = makeid(6);
    var csrfToken = jsonwebtoken_1.default.sign({
        id: id,
        type: "csrf",
        string: unique
    }, CSRF_SECRET, {
        expiresIn: "30m"
    });
    return csrfToken;
};
exports.createCsrfToken = createCsrfToken;
