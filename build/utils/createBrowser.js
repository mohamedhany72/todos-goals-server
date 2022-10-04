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
exports.updateRefresh = exports.selectBrowser = exports.createBrowser = void 0;
var token_1 = require("../models/token");
var createTokens_1 = require("./createTokens");
var tokens = new token_1.TokenModel();
var createBrowser = function (refreshToken, user) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, success, load, rand, browsers, result, browser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = user.id;
                return [4 /*yield*/, tokens.index(user_id)];
            case 1:
                _a = _b.sent(), success = _a.success, load = _a.load;
                rand = Math.floor(Math.random() * 1000000) + 1;
                if (success) {
                    browsers = load.map(function (item) { return Number(item.browser); });
                    while (browsers.includes(rand)) {
                        rand = Math.floor(Math.random() * 1000000) + 1;
                    }
                }
                return [4 /*yield*/, tokens.create(refreshToken, rand, user_id)];
            case 2:
                result = _b.sent();
                if (!result.success) {
                    return [2 /*return*/, {
                            success: false,
                            code: 2,
                            msg: result.msg,
                            browser: ""
                        }];
                }
                browser = (0, createTokens_1.createBrowserToken)(user, result.load.id, rand);
                return [2 /*return*/, {
                        success: true,
                        code: 1,
                        browser: browser
                    }];
        }
    });
}); };
exports.createBrowser = createBrowser;
var selectBrowser = function (user_id, id, browser) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, success, load;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, tokens.show(id)];
            case 1:
                _a = _b.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    return [2 /*return*/, {
                            success: false,
                            code: 3,
                            msg: "Record not found"
                        }];
                }
                if (user_id != load.user_id) {
                    return [2 /*return*/, {
                            success: false,
                            code: 4,
                            msg: "User id not equal that from db"
                        }];
                }
                if (browser != load.browser) {
                    return [2 /*return*/, {
                            success: false,
                            code: 4,
                            msg: "Browser code not equal that from db"
                        }];
                }
                return [2 /*return*/, {
                        success: true,
                        code: 1,
                        refresh: load.refresh,
                        msg: "Record found!"
                    }];
        }
    });
}); };
exports.selectBrowser = selectBrowser;
var updateRefresh = function (browser, user, refresh, id) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, result, newRefresh, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = user.id;
                return [4 /*yield*/, selectBrowser(user_id, id, browser)];
            case 1:
                result = _a.sent();
                if (!result.success) {
                    return [2 /*return*/, {
                            success: false,
                            code: result.code,
                            msg: result.msg
                        }];
                }
                if (refresh != result.refresh) {
                    return [2 /*return*/, {
                            success: false,
                            code: 5,
                            msg: "Refresh code not equal that from db"
                        }];
                }
                newRefresh = (0, createTokens_1.createRefreshToken)(user);
                return [4 /*yield*/, tokens.edit(newRefresh, id)];
            case 2:
                success = (_a.sent()).success;
                if (!success) {
                    return [2 /*return*/, {
                            success: false,
                            code: 2,
                            msg: "Server side error!"
                        }];
                }
                return [2 /*return*/, {
                        success: true,
                        code: 1,
                        refresh: newRefresh
                    }];
        }
    });
}); };
exports.updateRefresh = updateRefresh;
