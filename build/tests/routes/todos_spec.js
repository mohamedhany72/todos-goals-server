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
var createTokens_1 = require("../../utils/createTokens");
var test_utils_1 = require("../../utils/test_utils");
var request = (0, supertest_1.default)(server_1.default);
var validEmail = "medo.elshazly14@gmail.com";
var validPswd = "AAbb00--";
var mainRoute = "/api/todos/";
var todo = {
    id: 1,
    todo: "Buy Milk!",
    complete: false,
    user_id: 1
};
var access, badAccess, browser, csrfCookie, csrfToken, verifyToken, user;
describe("Testing Routes: Todos", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, email, gender, pswd, cpswd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = test_utils_1.userObj.name;
                    email = validEmail;
                    gender = test_utils_1.userObj.gender;
                    pswd = validPswd;
                    cpswd = validPswd;
                    return [4 /*yield*/, request
                            .post("/api/users/register")
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
                            browser = res.body.browser;
                            verifyToken = (0, createTokens_1.createVerifyToken)(res.body.user);
                            user = res.body.user;
                            todo.user_id = user.id;
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request
                            .get("/api/users/csrf")
                            .set("Authorization", access)
                            .expect(function (res) {
                            csrfToken = res.body.csrfToken;
                            csrfCookie = res.headers["set-cookie"][0]
                                .split(";")[0]
                                .split("=")[1];
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/api/users/delete")
                        .set("Authorization", access)
                        .set("Cookie", ["browser=".concat(browser, "; _csrf=").concat(csrfCookie)])
                        .send({
                        _csrf: csrfToken,
                        pswd: validPswd,
                        confirmMsg: "I want to delete my account"
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get' with bad access", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute)
                        .set("Authorization", badAccess)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get' without verification", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute)
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    expect(response.text).toBe("User is not verified");
                    return [2 /*return*/];
            }
        });
    }); });
    it("verify user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/api/users/verify/".concat(verifyToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.text).toBe("User verified!");
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get todo' after verification", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute)
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.todos).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    // add todo
    it("test 'add todo' ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post(mainRoute)
                        .set("Authorization", access)
                        .send({
                        todo: todo.todo
                    })
                        .expect(function (res) {
                        todo.id = res.body.todo.id;
                        todo.date = res.body.todo.date;
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.todo).toEqual(todo);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get' should return the todo in array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute)
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.todos).toEqual([todo]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'toggle todo' that don't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute)
                        .set("Authorization", access)
                        .send({
                        id: todo.id + 1
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'toggle todo' that exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put(mainRoute)
                        .set("Authorization", access)
                        .send({
                        id: todo.id
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'delete todo' that don't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var wrongID, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrongID = todo.id + 1;
                    return [4 /*yield*/, request
                            .delete("".concat(mainRoute, "/").concat(wrongID))
                            .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'delete todo' that exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("".concat(mainRoute, "/").concat(todo.id))
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("test 'get todo' should return empty array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get(mainRoute)
                        .set("Authorization", access)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.todos).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
