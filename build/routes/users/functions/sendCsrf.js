"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendcsrf = function (req, res) {
    res.status(200).json({ csrfToken: req.csrfToken() });
    return;
};
exports.default = sendcsrf;
