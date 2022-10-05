"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailer_1 = __importDefault(require("./mailer"));
var createTokens_1 = require("./createTokens");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var FRONT_END_ROOT_URL = process.env.FRONT_END_ROOT_URL;
var sendVerificationEmail = function (user) {
    var verify = (0, createTokens_1.createVerifyToken)(user);
    var temp = "verification";
    var subject = "Verify Your Account!";
    var link = "".concat(FRONT_END_ROOT_URL, "/verify/").concat(verify);
    var context = {
        name: user.name,
        link: link
    };
    (0, mailer_1.default)(user.email, subject, temp, context);
    // console.log("sending verify")
    return;
};
exports.default = sendVerificationEmail;
