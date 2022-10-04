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
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_1 = require("../../../models/user");
var createTokens_1 = require("../../../utils/createTokens");
var dotenv_1 = __importDefault(require("dotenv"));
var destructureUser_1 = __importDefault(require("../../../utils/destructureUser"));
var createBrowser_1 = require("../../../utils/createBrowser");
var manageCookies_1 = require("../../../utils/manageCookies");
dotenv_1.default.config();
var pepper = process.env.BCRYPT_PASSWORD;
var model = new user_1.UserModel();
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, pswd, _a, success, load, user, match, access, refresh, result, browser;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                email = (_b = req.body.email) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                pswd = req.body.pswd;
                // check if email and pswd are not null
                if (email == null || pswd == null) {
                    res.status(406).send("please enter email and password!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model.select(email)];
            case 1:
                _a = _c.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    res.status(404).send("User not found!");
                    return [2 /*return*/];
                }
                user = (0, destructureUser_1.default)(load);
                return [4 /*yield*/, bcrypt_1.default.compare(pswd + pepper, load.password)];
            case 2:
                match = _c.sent();
                if (!match) {
                    res.status(403).send("Wrong password!");
                    return [2 /*return*/];
                }
                access = (0, createTokens_1.createAccessToken)(user);
                refresh = (0, createTokens_1.createRefreshToken)(user);
                return [4 /*yield*/, (0, createBrowser_1.createBrowser)(refresh, user)];
            case 3:
                result = _c.sent();
                // add tokens to db
                if (!result.success) {
                    res.status(500).send("server side error, please try again later!");
                    return [2 /*return*/];
                }
                browser = result.browser;
                (0, manageCookies_1.refreshCookie)(res, refresh);
                (0, manageCookies_1.browserCookie)(res, browser);
                res.status(200).json({
                    user: user,
                    access: access
                    // , refresh, browser
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = login;
