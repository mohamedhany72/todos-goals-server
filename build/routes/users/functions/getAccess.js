"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createTokens_1 = require("../../../utils/createTokens");
var getAccess = function (_req, res) {
    var user = res.locals.user;
    //  generate access token
    var access = (0, createTokens_1.createAccessToken)(user);
    // send it back
    res.status(200).json({ access: access });
};
exports.default = getAccess;
