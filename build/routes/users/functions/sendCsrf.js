"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createTokens_1 = require("../../../utils/createTokens");
var sendcsrf = function (_req, res) {
    var user = res.locals.user;
    var csrf = (0, createTokens_1.createCsrfToken)(user.id);
    res.status(200).json({ csrfToken: csrf });
    return;
};
exports.default = sendcsrf;
