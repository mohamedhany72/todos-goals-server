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
exports.TokenModel = void 0;
var database_1 = __importDefault(require("../database"));
var TokenModel = /** @class */ (function () {
    function TokenModel() {
    }
    // index
    TokenModel.prototype.index = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM public.tokens WHERE user_id=$1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            return [2 /*return*/, {
                                    success: true,
                                    code: 1,
                                    load: result.rows
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    code: 3,
                                    msg: "tokens not found"
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error select tokens: ".concat(err_1)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // show
    TokenModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM public.tokens WHERE id=$1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            return [2 /*return*/, {
                                    success: true,
                                    code: 1,
                                    load: result.rows[0]
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    code: 3,
                                    msg: "tokens not found"
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error select tokens: ".concat(err_2)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // create
    TokenModel.prototype.create = function (refreshToken, browser, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "INSERT INTO public.tokens( refresh, browser, user_id ) VALUES ($1, $2, $3) RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [
                                refreshToken,
                                browser,
                                user_id
                            ])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows.length) {
                            return [2 /*return*/, {
                                    success: false,
                                    code: 2,
                                    msg: "Error add tokens"
                                }];
                        }
                        return [2 /*return*/, {
                                success: true,
                                code: 1,
                                load: result.rows[0]
                            }];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error add tokens: ".concat(err_3)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // edit
    TokenModel.prototype.edit = function (refreshToken, id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE public.tokens SET refresh=$1 WHERE id=$2 RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [refreshToken, id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length) {
                            return [2 /*return*/, {
                                    success: true,
                                    code: 1
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    code: 3,
                                    msg: "tokens not found"
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error update tokens: ".concat(err_4)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // delete
    TokenModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM public.tokens WHERE id=$1 RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (!result.rows.length) {
                            return [2 /*return*/, {
                                    success: false,
                                    code: 3,
                                    msg: "Error delete tokens: Tokens not existed"
                                }];
                        }
                        return [2 /*return*/, {
                                success: true,
                                code: 1
                            }];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error delete tokens: ".concat(err_5)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // delete all
    TokenModel.prototype.deleteAll = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM public.tokens WHERE user_id=$1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [user_id])];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, {
                                success: true,
                                code: 1
                            }];
                    case 4:
                        err_6 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                code: 2,
                                msg: "Error delete tokens: ${err"
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TokenModel;
}());
exports.TokenModel = TokenModel;
