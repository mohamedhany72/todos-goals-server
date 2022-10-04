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
exports.UserModel = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, pepper = _a.BCRYPT_PASSWORD, saltRounds = _a.SALT_ROUNDS;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    // select user
    UserModel.prototype.select = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, returnedObject, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM public.users WHERE email=$1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [email])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        returnedObject = void 0;
                        result.rows.length
                            ? (returnedObject = {
                                success: true,
                                load: result.rows[0]
                            })
                            : (returnedObject = {
                                success: false,
                                msg: "user doesn't exist"
                            });
                        return [2 /*return*/, returnedObject];
                    case 4:
                        err_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: "Error selecting User"
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // add user
    UserModel.prototype.add = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, query, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
                        query = "INSERT INTO public.users(\
                        name, email, password, gender)\
                        VALUES ($1, $2, $3, $4) RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [
                                user.name,
                                user.email,
                                hash,
                                user.gender
                            ])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, {
                                success: true,
                                load: result.rows[0]
                            }];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: err_2
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // verify
    UserModel.prototype.verify = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE public.users SET verified=TRUE WHERE email=$1 RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [email])];
                    case 3:
                        result = _a.sent();
                        if (result.rows.length) {
                            return [2 /*return*/, {
                                    success: true,
                                    msg: "user verified"
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "user not found!"
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: "Error verifying user: ".concat(err_3)
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // update user
    UserModel.prototype.update = function (id, name, gender, picurl) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE public.users\
                        SET name=$2, gender=$3, picurl=$4\
                        WHERE id=$1 RETURNING *;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [id, name, gender, picurl])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, {
                                success: true,
                                load: result.rows[0]
                            }];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: err_4
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // change password
    UserModel.prototype.changePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var query, hash, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE public.users SET password=$2 WHERE id=$1 RETURNING *;";
                        hash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [id, hash])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, {
                                success: true,
                                load: result.rows[0]
                            }];
                    case 4:
                        err_5 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: err_5
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // remove user
    UserModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conn, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM public.users WHERE id=$1;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(query, [id])];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, {
                                success: true
                            }];
                    case 4:
                        err_6 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                msg: err_6
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
