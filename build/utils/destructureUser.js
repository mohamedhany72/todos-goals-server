"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var destructureUser = function (userFull) {
    var user = (function (_a) {
        var id = _a.id, name = _a.name, email = _a.email, gender = _a.gender, picurl = _a.picurl, verified = _a.verified;
        return ({
            id: id,
            name: name,
            email: email,
            gender: gender,
            picurl: picurl,
            verified: verified
        });
    })(userFull);
    return user;
};
exports.default = destructureUser;
