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
exports.NAME_REGEX = void 0;
var email_validator_1 = __importDefault(require("email-validator"));
var user_1 = require("../../../models/user");
// import { TokenModel } from "../../../models/token";
var createTokens_1 = require("../../../utils/createTokens");
var destructureUser_1 = __importDefault(require("../../../utils/destructureUser"));
var schema_1 = __importDefault(require("../../../utils/schema"));
var sendVerify_1 = __importDefault(require("../../../utils/sendVerify"));
var createBrowser_1 = require("../../../utils/createBrowser");
var manageCookies_1 = require("../../../utils/manageCookies");
var model = new user_1.UserModel();
// const tokens = new TokenModel();
exports.NAME_REGEX = /^[A-z][A-z0-9-_ ]{2,23}$/;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, email, gender, pswd, cpswd, findUser, _a, success, load, user, access, refresh, browser;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                name = req.body.name;
                email = (_b = req.body.email) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                gender = req.body.gender;
                pswd = req.body.pswd;
                cpswd = req.body.cpswd;
                return [4 /*yield*/, model.select(email)];
            case 1:
                findUser = _c.sent();
                // const emailRes = await validate(email);
                if (findUser.success) {
                    res.status(409).send("email exists, please try to login in!");
                    return [2 /*return*/];
                }
                if (name == null || !exports.NAME_REGEX.test(name)) {
                    res.status(406).send("name must have at least 3 characters!");
                    return [2 /*return*/];
                }
                if (email == null || !email_validator_1.default.validate(email)) {
                    res.status(406).send("please enter a valid email!");
                    return [2 /*return*/];
                }
                if (pswd == null || cpswd == null || cpswd !== pswd) {
                    res.status(406).send("passwords not match!");
                    return [2 /*return*/];
                }
                if (!schema_1.default.validate(pswd)) {
                    res.status(406).send("password must be at least 8 charcaters and maximum of 16 characters it must contain lowercase, uppercase, numbers and special charcters!");
                    return [2 /*return*/];
                }
                if (gender == null || (Number(gender) !== 1 && Number(gender) !== 2)) {
                    res.status(406).send("you must select gender!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model.add({
                        name: name,
                        email: email,
                        password: cpswd,
                        gender: gender
                    })];
            case 2:
                _a = _c.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    res.status(500).send("Server side error, please try again later!");
                    return [2 /*return*/];
                }
                user = (0, destructureUser_1.default)(load);
                access = (0, createTokens_1.createAccessToken)(user);
                refresh = (0, createTokens_1.createRefreshToken)(user);
                return [4 /*yield*/, (0, createBrowser_1.createBrowser)(refresh, user)];
            case 3:
                browser = (_c.sent()).browser;
                (0, sendVerify_1.default)(user);
                // const refreshDate = new Date();
                // refreshDate.setHours(refreshDate.getHours() + 24 * 7);
                // const browserDate = new Date();
                // browserDate.setHours(browserDate.getHours() + 365 * 7);
                // // Secure;
                // res.setHeader("Set-Cookie", [
                //     `refresh=${refresh}; Expires=${refreshDate}; HttpOnly; Path=/`,
                //     `browser=${browser}; Expires=${browserDate}; HttpOnly; Path=/`
                // ]);
                (0, manageCookies_1.refreshCookie)(res, refresh);
                (0, manageCookies_1.browserCookie)(res, browser);
                res.status(200).json({
                    user: user,
                    access: access
                    // refresh,
                    // browser
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = register;
