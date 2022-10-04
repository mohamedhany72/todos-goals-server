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
var user_1 = require("../../models/user");
var test_utils_1 = require("../../utils/test_utils");
var destructureUser_1 = __importDefault(require("../../utils/destructureUser"));
var model = new user_1.UserModel();
var userReturned = {
    id: 1,
    name: "Mohamed Hany",
    email: "medo@medo.com",
    gender: 1,
    picurl: null,
    verified: false
};
var oldHash;
describe("Testing Model: User", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, test_utils_1.resetId)();
            return [2 /*return*/];
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, test_utils_1.resetId)();
            return [2 /*return*/];
        });
    }); });
    it("'Select' method should exist", function () {
        expect(model.select).toBeDefined();
    });
    it("'Select' method should return false", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.select(test_utils_1.userObj.email)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBeFalse();
                    expect(result.msg).toBe("user doesn't exist");
                    return [2 /*return*/];
            }
        });
    }); });
    // add method should exist
    it("'Add' method should exist", function () {
        expect(model.add).toBeDefined();
    });
    // add method should add the user
    it("'Add' method should add the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.add(test_utils_1.userObj)];
                case 1:
                    result = _a.sent();
                    oldHash = result.load.password;
                    user = (0, destructureUser_1.default)(result.load);
                    // @ts-ignore
                    expect(user).toEqual(userReturned);
                    return [2 /*return*/];
            }
        });
    }); });
    // select method should select the user
    it("'Select' method should return the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.select(test_utils_1.userObj.email)];
                case 1:
                    result = _a.sent();
                    user = (0, destructureUser_1.default)(result.load);
                    // @ts-ignore
                    expect(user).toEqual(userReturned);
                    return [2 /*return*/];
            }
        });
    }); });
    // verify method should exist
    it("'Verify' method should exist", function () {
        expect(model.update).toBeDefined();
    });
    // verify method should verify the user
    it("'Verify' method should verify the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userReturned.verified = true;
                    return [4 /*yield*/, model.verify(test_utils_1.userObj.email)];
                case 1:
                    result = _a.sent();
                    expect(result.success).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    // update method should exist
    it("'Update' method should exist", function () {
        expect(model.update).toBeDefined();
    });
    // update method should update the user
    it("'Update' method should update the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.update(1, "Mido Hany", 1, "url")];
                case 1:
                    result = _a.sent();
                    user = (0, destructureUser_1.default)(result.load);
                    userReturned.name = "Mido Hany";
                    userReturned.picurl = "url";
                    // @ts-ignore
                    expect(user).toEqual(userReturned);
                    return [2 /*return*/];
            }
        });
    }); });
    // change password should exist
    it("'Change Password' should exist", function () {
        expect(model.changePassword).toBeDefined();
    });
    // change password should update the user
    it("'Change Password' should update the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, newHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.changePassword(1, "123password")];
                case 1:
                    result = _a.sent();
                    newHash = result.load.password;
                    expect(newHash).not.toEqual(oldHash);
                    return [2 /*return*/];
            }
        });
    }); });
    // delete method should exist
    it("'Delete' method should exist", function () {
        expect(model.delete).toBeDefined();
    });
    // delete method should delete the user
    it("'Delete' method should delete the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.delete(1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, model.select(test_utils_1.userObj.email)];
                case 2:
                    result = _a.sent();
                    expect(result.success).toBeFalse();
                    expect(result.msg).toBe("user doesn't exist");
                    return [2 /*return*/];
            }
        });
    }); });
});
