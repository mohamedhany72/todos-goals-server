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
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../../models/token");
var user_1 = require("../../models/user");
var createTokens_1 = require("../../utils/createTokens");
var test_utils_1 = require("../../utils/test_utils");
var userModel = new user_1.UserModel();
var model = new token_1.TokenModel();
var refresh = (0, createTokens_1.createRefreshToken)(test_utils_1.userObj);
var browser = Math.floor(Math.random() * 1000000) + 1;
var token = {
    id: 1,
    refresh: refresh,
    browser: browser,
    user_id: test_utils_1.userObj.id
};
describe("Testing Tokens Model", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, test_utils_1.resetId)();
                    // add user here
                    return [4 /*yield*/, userModel.add(test_utils_1.userObj)];
                case 1:
                    // add user here
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // remove user
                return [4 /*yield*/, userModel.delete(1)];
                case 1:
                    // remove user
                    _a.sent();
                    (0, test_utils_1.resetId)();
                    return [2 /*return*/];
            }
        });
    }); });
    it("'index' method should exist", function () {
        expect(model.index).toBeDefined();
    });
    it("'index' method should return false with code '3'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.index(token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(false);
                    expect(result.code).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'show' method should exist", function () {
        expect(model.show).toBeDefined();
    });
    it("'show' method should return false with code '3'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.show(token.id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(false);
                    expect(result.code).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'create' method should exist", function () {
        expect(model.create).toBeDefined();
    });
    it("'create' method should success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.create(token.refresh, token.browser, token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    expect(result.load).toEqual(token);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'index' method should return array with the record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.index(token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    expect(result.load).toEqual([token]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'show' method should return the record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.show(token.id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    expect(result.load).toEqual(token);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'edit' method should exist", function () {
        expect(model.edit).toBeDefined();
    });
    it("'edit' method should return success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refresh = (0, createTokens_1.createRefreshToken)(test_utils_1.userObj);
                    return [4 /*yield*/, model.edit(refresh, token.id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'delete' method should exist", function () {
        expect(model.delete).toBeDefined();
    });
    it("'delete' method should return success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.delete(token.id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'delete' method should return false with code '3'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.delete(token.id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(false);
                    expect(result.code).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create two new records", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    browser = Math.floor(Math.random() * 10000) + 1;
                    return [4 /*yield*/, model.create(token.refresh, browser, token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("create another record", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    browser = Math.floor(Math.random() * 100000) + 1;
                    return [4 /*yield*/, model.create(token.refresh, browser, token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'deleteAll' method should exist", function () {
        expect(model.deleteAll).toBeDefined();
    });
    it("'deleteAll' method should return success", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.deleteAll(token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("'index' method should return empty array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.index(token.user_id)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(false);
                    expect(result.code).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
});
