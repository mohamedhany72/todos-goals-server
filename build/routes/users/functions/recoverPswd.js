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
exports.recoverPswdGet = exports.recoverPswdPut = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("../../../models/user");
var schema_1 = __importDefault(require("../../../utils/schema"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var model = new user_1.UserModel();
var recoverPswdPut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, pswd, cpswd;
    return __generator(this, function (_a) {
        token = req.body.code;
        pswd = req.body.pswd;
        cpswd = req.body.cpswd;
        if (token == null) {
            res.status(406).send("Code in email is required!");
            return [2 /*return*/];
        }
        // compare new password
        if (pswd == null || cpswd == null || cpswd !== pswd) {
            res.status(406).send("passwords not match!");
            return [2 /*return*/];
        }
        if (!schema_1.default.validate(pswd)) {
            res.status(406).send("password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!");
            return [2 /*return*/];
        }
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
            var id, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            res.status(403).send("Token expired or not valid");
                            return [2 /*return*/];
                        }
                        if (decoded.type !== "pswd") {
                            res.status(401).send("You are not authorizied!");
                            return [2 /*return*/];
                        }
                        id = decoded.id;
                        return [4 /*yield*/, model.changePassword(id, cpswd)];
                    case 1:
                        success = (_a.sent()).success;
                        if (!success) {
                            res.status(500).send("Server side error!");
                            return [2 /*return*/];
                        }
                        res.status(200).send("Password changed!");
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.recoverPswdPut = recoverPswdPut;
var recoverPswdGet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        code = req.params.code;
        if (code == null) {
            res.status(406).send("Code in email is required!");
            return [2 /*return*/];
        }
        jsonwebtoken_1.default.verify(code, TOKEN_SECRET, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    res.status(403).send("Token expired or not valid");
                    return [2 /*return*/];
                }
                if (decoded.type !== "pswd") {
                    res.status(401).send("You are not authorizied!");
                    return [2 /*return*/];
                }
                console.log("_csrf: ", req.csrfToken());
                res.status(200).json({ code: code, csrfToken: req.csrfToken() });
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.recoverPswdGet = recoverPswdGet;
