"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var test_utils_1 = require("../../utils/test_utils");
var createTokens_1 = require("../../utils/createTokens");
var request = (0, supertest_1.default)(server_1.default);
var badToken, access, badAccess, refresh, pswdToken, badPswdToken, browser, verifyToken, csrfToken, badcsrf, csrfCookie;
var validEmail = "medo.elshazly14@gmail.com";
var validPswd = "AAbb00--";
var oldValidPswd;
var mainRoute = "/api/users/";
describe("Testing Routes: Users", function () {
    // test register
    it("test 'Register' with bad data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, email, gender, pswd, cpswd, response1, response2, response3, response4, response5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = "a";
                    email = "aa.com";
                    gender = "5";
                    pswd = "badpassword";
                    cpswd = "anotherBadpassword";
                    return [4 /*yield*/, request.post(mainRoute + "register").send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })];
                case 1:
                    response1 = _a.sent();
                    expect(response1.status).toBe(406);
                    expect(response1.text).toBe("name must have at least 3 characters!");
                    name = "mohamed";
                    return [4 /*yield*/, request.post(mainRoute + "register").send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(406);
                    expect(response2.text).toBe("please enter a valid email!");
                    email = validEmail;
                    return [4 /*yield*/, request.post(mainRoute + "register").send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })];
                case 3:
                    response3 = _a.sent();
                    expect(response3.status).toBe(406);
                    expect(response3.text).toBe("passwords not match!");
                    pswd = "badequalpass";
                    cpswd = "badequalpass";
                    return [4 /*yield*/, request.post(mainRoute + "register").send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })];
                case 4:
                    response4 = _a.sent();
                    expect(response4.status).toBe(406);
                    expect(response4.text).toBe("password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!");
                    pswd = validPswd;
                    cpswd = validPswd;
                    return [4 /*yield*/, request.post(mainRoute + "register").send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })];
                case 5:
                    response5 = _a.sent();
                    expect(response5.status).toBe(406);
                    expect(response5.text).toBe("you must select gender!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Register' with good data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, email, gender, pswd, cpswd, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = test_utils_1.userObj.name;
                    email = validEmail;
                    gender = test_utils_1.userObj.gender;
                    pswd = validPswd;
                    cpswd = validPswd;
                    return [4 /*yield*/, request
                            .post(mainRoute + "register")
                            .send({
                            name: name,
                            email: email,
                            gender: gender,
                            pswd: pswd,
                            cpswd: cpswd
                        })
                            .expect(function (res) {
                            access = "Bearer " + res.body.access;
                            badAccess = access + "inavlid";
                            refresh = res.headers["set-cookie"][0]
                                .split(";")[0]
                                .split("=")[1];
                            browser = res.headers["set-cookie"][3]
                                .split(";")[0]
                                .split("=")[1];
                            badToken = res.body.broswer + "invalid";
                            verifyToken = (0, createTokens_1.createVerifyToken)(res.body.user);
                            pswdToken = (0, createTokens_1.createPswdToken)(res.body.user.id);
                            badPswdToken = pswdToken + "k";
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // test logout
    it("test 'Logout' with unauthorizied token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", badAccess)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Logout' with unvalid tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(badToken)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Logout' with good tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // test login
    it("test 'Login' with bad data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var email, pswd, response, response2, response3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "medo@medo.com";
                    pswd = "AAbb00--f";
                    return [4 /*yield*/, request.post(mainRoute + "login").send({
                            email: email
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(406);
                    expect(response.text).toBe("please enter email and password!");
                    return [4 /*yield*/, request.post(mainRoute + "login").send({
                            email: email,
                            pswd: pswd
                        })];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(404);
                    expect(response2.text).toBe("User not found!");
                    email = validEmail;
                    return [4 /*yield*/, request.post(mainRoute + "login").send({
                            email: email,
                            pswd: pswd
                        })];
                case 3:
                    response3 = _a.sent();
                    expect(response3.status).toBe(403);
                    expect(response3.text).toBe("Wrong password!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Login' with good data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post(mainRoute + "login")
                        .send({
                        email: validEmail,
                        pswd: validPswd
                    })
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                        refresh = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        browser = res.headers["set-cookie"][3]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // send verify
    it("test 'sendVerify' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "sendverify")
                        .set("Authorization", badAccess)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'sendVerify' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "sendverify")
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // verify user
    it("test 'verify' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(mainRoute + "verify/".concat(badToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'verify' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(mainRoute + "verify/".concat(verifyToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.text).toBe("User verified!");
                    return [2 /*return*/];
            }
        });
    }); });
    // csrf get
    it("test 'csrf get' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "csrf")
                        .set("Authorization", badAccess)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'update get' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "csrf")
                        .set("Authorization", access)
                        .expect(function (res) {
                        csrfToken = res.body.csrfToken;
                        csrfCookie = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        badcsrf = csrfToken + "k";
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // update put
    it("test 'update put' with bad access token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "update")
                        .set("Authorization", badAccess)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        name: "new name",
                        gender: 1
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'update put' with bad csrf token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "update")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        name: "new name",
                        gender: 1,
                        _csrf: badcsrf
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    // it("test 'update put' with bad data", async (): Promise<void> => {
    //     const response = await request
    //         .put(mainRoute + "update")
    //         .set("Authorization", access)
    //         .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
    //         .send({
    //             _csrf: csrfToken,
    //             name: "new name",
    //             gender: 8
    //         });
    //     expect(response.status).toBe(406);
    // });
    // it("test 'update put' with good data", async (): Promise<void> => {
    //     const response = await request
    //         .put(mainRoute + "update")
    //         .set("Authorization", access)
    //         .set("Cookie", [`browser=${browser}; _csrf=${csrfCookie}`])
    //         .send({
    //             _csrf: csrfToken,
    //             name: "medo capo",
    //             gender: 1
    //         });
    //     expect(response.status).toBe(200);
    // });
    // pswd put
    it("test 'change pswd' with bad access", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "changepassword")
                        .set("Authorization", badAccess)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: badcsrf,
                        opswd: "new name",
                        pswd: "badpassword",
                        cpswd: "anotherbadpassword"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'change pswd' with bad csrf", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "changepassword")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: badcsrf,
                        opswd: "new name",
                        pswd: "badpassword",
                        cpswd: "anotherbadpassword"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'change pswd' with bad data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, response2, response3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "changepassword")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        opswd: "new name",
                        pswd: "badpassword",
                        cpswd: "anotherbadpassword"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(406);
                    expect(response.text).toBe("Wrong old password!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "changepassword")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            opswd: validPswd,
                            pswd: "badpassword",
                            cpswd: "anotherbadpassword"
                        })];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(406);
                    expect(response2.text).toBe("passwords not match!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "changepassword")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            opswd: validPswd,
                            pswd: "badpassword",
                            cpswd: "badpassword"
                        })];
                case 3:
                    response3 = _a.sent();
                    expect(response3.status).toBe(406);
                    expect(response3.text).toBe("password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'change pswd' with good data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldValidPswd = validPswd;
                    validPswd = "BBaa00--";
                    return [4 /*yield*/, request
                            .put(mainRoute + "changepassword")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            opswd: oldValidPswd,
                            pswd: validPswd,
                            cpswd: validPswd
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'Logout' after password changed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    access = refresh = browser = csrfToken = csrfCookie = "";
                    return [2 /*return*/];
            }
        });
    }); });
    // test login
    it("test 'Login' with old password return 'Wrong password!'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(mainRoute + "login").send({
                        email: validEmail,
                        pswd: oldValidPswd
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Wrong password!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Login' with new password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post(mainRoute + "login")
                        .send({
                        email: validEmail,
                        pswd: validPswd
                    })
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                        refresh = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        browser = res.headers["set-cookie"][3]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // forget password
    it("test 'forget password' with non-existing email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(mainRoute + "forgetpassword").send({
                        email: "medo@medo.com"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.text).toBe("Email doesn't exist, please try to sign up!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'forget password' with existing email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(mainRoute + "forgetpassword").send({
                        email: validEmail
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.text).toBe("Email sent!");
                    return [2 /*return*/];
            }
        });
    }); });
    // recover password get
    it("test 'recover password get' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, response2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get(mainRoute + "recoverpassword/")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [4 /*yield*/, request.get(mainRoute + "recoverpassword/".concat(badPswdToken))];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(403);
                    expect(response2.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'recover password get' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "recoverpassword/".concat(pswdToken))
                        .expect(function (res) {
                        csrfToken = res.body.csrfToken;
                        csrfCookie = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        pswdToken = res.body.code;
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // recover password put
    it("test 'recover password' with bad data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response0, response, response2, response3, response4, response5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute + "recoverpassword")
                        .send({
                        pswd: "badpassword"
                    })];
                case 1:
                    response0 = _a.sent();
                    expect(response0.status).toBe(403);
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            pswd: "badpassword"
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(406);
                    expect(response.text).toBe("Code in email is required!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            code: badPswdToken,
                            pswd: "badpassword"
                        })];
                case 3:
                    response2 = _a.sent();
                    expect(response2.status).toBe(406);
                    expect(response2.text).toBe("passwords not match!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            code: badPswdToken,
                            pswd: "badPassword",
                            cpswd: "anotherBadPassord"
                        })];
                case 4:
                    response3 = _a.sent();
                    expect(response3.status).toBe(406);
                    expect(response3.text).toBe("passwords not match!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            code: badPswdToken,
                            pswd: "badPassword",
                            cpswd: "badPassword"
                        })];
                case 5:
                    response4 = _a.sent();
                    expect(response4.status).toBe(406);
                    expect(response4.text).toBe("password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!");
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            code: badPswdToken,
                            pswd: "AAbb00--",
                            cpswd: "AAbb00--"
                        })];
                case 6:
                    response5 = _a.sent();
                    expect(response5.status).toBe(403);
                    expect(response5.text).toBe("Token expired or not valid");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'recover password' with good data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldValidPswd = validPswd;
                    validPswd = "AAbb00--";
                    return [4 /*yield*/, request
                            .put(mainRoute + "recoverpassword")
                            .set("Cookie", ["_csrf=".concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            code: pswdToken,
                            pswd: validPswd,
                            cpswd: validPswd
                        })];
                case 1:
                    response5 = _a.sent();
                    expect(response5.status).toBe(200);
                    expect(response5.text).toBe("Password changed!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("'Logout' after password changed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    access = refresh = browser = csrfToken = csrfCookie = "";
                    return [2 /*return*/];
            }
        });
    }); });
    // test login
    it("test 'Login' with old password return 'Wrong password!'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(mainRoute + "login").send({
                        email: validEmail,
                        pswd: oldValidPswd
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Wrong password!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'Login' with new password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post(mainRoute + "login")
                        .send({
                        email: validEmail,
                        pswd: validPswd
                    })
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                        refresh = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        browser = res.headers["set-cookie"][3]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // test refresh
    it("test 'refresh' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, response2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "refresh")
                        .set("Cookie", ["browser=".concat(browser, "; refresh=").concat(badToken)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [4 /*yield*/, request
                            .get(mainRoute + "refresh")
                            .set("Cookie", ["browser=".concat(browser, "; refresh=").concat(browser)])];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(401);
                    expect(response2.text).toBe("you are not authorized");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'refresh' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "refresh")
                        .set("Cookie", ["browser=".concat(browser, ";refresh=").concat(refresh)])
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                        refresh = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // get access
    it("test 'get access' with bad token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, response2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "getaccess")
                        .set("Cookie", ["refresh=".concat(badToken)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [4 /*yield*/, request
                            .get(mainRoute + "getaccess")
                            .set("Cookie", ["refresh=".concat(browser)])];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(401);
                    expect(response2.text).toBe("you are not authorized");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get access' with good token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "getaccess")
                        .set("Cookie", ["refresh=".concat(refresh)])
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // test refresh after logout
    it("logout again", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logout")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'refresh' with good token after logout - should fail", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "refresh")
                        .set("Cookie", ["browser=".concat(browser, ";refresh=").concat(refresh)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    expect(response.text).toBe("Record not found");
                    access = refresh = browser = csrfToken = csrfCookie = "";
                    return [2 /*return*/];
            }
        });
    }); });
    // test logout all
    it("test 'Login' with new password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post(mainRoute + "login")
                        .send({
                        email: validEmail,
                        pswd: validPswd
                    })
                        .expect(function (res) {
                        access = "Bearer " + res.body.access;
                        refresh = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                        browser = res.headers["set-cookie"][3]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'logout all' after logging in again", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "logoutall")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser)])];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    // test delete
    it("get csrf token to delete user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute + "csrf")
                        .set("Authorization", access)
                        .expect(function (res) {
                        csrfToken = res.body.csrfToken;
                        csrfCookie = res.headers["set-cookie"][0]
                            .split(";")[0]
                            .split("=")[1];
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'delete user' with bad data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, response2, response3, response4, response5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "delete")
                        .set("Authorization", badAccess)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        pswd: "badpswd",
                        confirmMsg: "don't delete my account!"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    expect(response.text).toBe("Token expired or not valid");
                    return [4 /*yield*/, request
                            .delete(mainRoute + "delete")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            pswd: "badpswd",
                            confirmMsg: "don't delete my account!",
                            _csrf: badcsrf
                        })];
                case 2:
                    response2 = _a.sent();
                    expect(response2.status).toBe(403);
                    return [4 /*yield*/, request
                            .delete(mainRoute + "delete")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            pswd: "badpswd",
                            confirmMsg: "don't delete my account!"
                        })];
                case 3:
                    response3 = _a.sent();
                    expect(response3.status).toBe(406);
                    expect(response3.text).toBe("please confirm that you want to delete your account!");
                    return [4 /*yield*/, request
                            .delete(mainRoute + "delete")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            confirmMsg: "I want to delete my account"
                        })];
                case 4:
                    response4 = _a.sent();
                    expect(response4.status).toBe(406);
                    expect(response4.text).toBe("please enter password to delete your account!");
                    return [4 /*yield*/, request
                            .delete(mainRoute + "delete")
                            .set("Authorization", access)
                            .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                            .send({
                            _csrf: csrfToken,
                            pswd: "badpswd",
                            confirmMsg: "I want to delete my account"
                        })];
                case 5:
                    response5 = _a.sent();
                    expect(response5.status).toBe(403);
                    expect(response5.text).toBe("Wrong password!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'delete user' with good data", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "delete")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        pswd: validPswd,
                        confirmMsg: "I want to delete my account"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.text).toBe("Account deleted!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'delete user' with good data again - should return 500", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete(mainRoute + "delete")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        pswd: validPswd,
                        confirmMsg: "I want to delete my account"
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    access = refresh = browser = csrfToken = csrfCookie = "";
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'login' after user is deleted", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post(mainRoute + "login").send({
                        email: validEmail,
                        pswd: validPswd
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.text).toBe("User not found!");
                    return [2 /*return*/];
            }
        });
    }); });
});
