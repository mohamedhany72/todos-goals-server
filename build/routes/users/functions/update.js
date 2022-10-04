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
var user_1 = require("../../../models/user");
var createTokens_1 = require("../../../utils/createTokens");
var destructureUser_1 = __importDefault(require("../../../utils/destructureUser"));
var createBrowser_1 = require("../../../utils/createBrowser");
var register_1 = require("./register");
var manageCookies_1 = require("../../../utils/manageCookies");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var model = new user_1.UserModel();
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var browserObj, oldRefresh, oldUser, name, gender, removePic, file, fileName, tempDir, uploadDir, fileSize, fileType, oldFileName, fileTempPath, maxSize, fileTempNameObj, fileTempName, newFileName, _a, success, load, msg, user, access, result, refresh;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                browserObj = res.locals.browser;
                oldRefresh = req.cookies.refresh;
                oldUser = res.locals.user;
                name = req.body.name;
                gender = req.body.gender;
                removePic = req.body.remove_pic === "false" ? false : true;
                file = req.files.file || false;
                fileName = oldUser.picurl;
                tempDir = path_1.default.join(__dirname, "..", "..", "..", "temp");
                uploadDir = path_1.default.join(__dirname, "..", "..", "..", "uploads");
                // @ts-ignore
                console.log("files: ", req.files);
                if (file && !removePic) {
                    console.log("ok");
                    fileSize = file.size, fileType = file.type, oldFileName = file.name, fileTempPath = file.path;
                    maxSize = 2 * 1024 * 1024;
                    if (fileSize > maxSize) {
                        res.status(415).send("file size is too large!");
                        return [2 /*return*/];
                    }
                    if (fileType !== ("image/png" && "image/jpeg")) {
                        res.status(415).send("file must be image (.jpg or .jpeg or .png)!");
                        return [2 /*return*/];
                    }
                    fileTempNameObj = fileTempPath.split("\\");
                    fileTempName = fileTempNameObj[fileTempNameObj.length - 1];
                    newFileName = Date.now() + "_" + oldFileName;
                    fs_extra_1.default.copySync(path_1.default.join(tempDir, fileTempName), path_1.default.join(uploadDir, newFileName));
                    // , err => {
                    //     if (err) {
                    //         res.status(500).send("Server side error! error copying the file");
                    //         return;
                    //     }
                    fileName = newFileName;
                    // })
                }
                // validate data
                if (name == null || !register_1.NAME_REGEX.test(name)) {
                    if (file) {
                        fs_extra_1.default.remove(path_1.default.join(uploadDir, fileName));
                    }
                    res.status(406).send("name must have at least 3 characters!");
                    return [2 /*return*/];
                }
                if (gender == null || (Number(gender) !== 1 && Number(gender) !== 2)) {
                    if (file) {
                        fs_extra_1.default.remove(path_1.default.join(uploadDir, fileName));
                    }
                    res.status(406).send("you must select gender!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model.update(oldUser.id, name, gender, removePic ? null : fileName)];
            case 1:
                _a = _b.sent(), success = _a.success, load = _a.load, msg = _a.msg;
                if (!success) {
                    if (file) {
                        fs_extra_1.default.remove(path_1.default.join(uploadDir, fileName));
                    }
                    res.status(500).send("Server side error:: ".concat(msg));
                    return [2 /*return*/];
                }
                else if ((removePic && oldUser.picurl) ||
                    (oldUser.picurl !== fileName && oldUser.picurl)) {
                    fs_extra_1.default.remove(path_1.default.join(uploadDir, oldUser.picurl));
                }
                user = (0, destructureUser_1.default)(load);
                access = (0, createTokens_1.createAccessToken)(user);
                return [4 /*yield*/, (0, createBrowser_1.updateRefresh)(browserObj.browser, user, oldRefresh, browserObj.id)];
            case 2:
                result = _b.sent();
                refresh = (0, createTokens_1.createRefreshToken)(user);
                if (result.success) {
                    refresh = result.refresh;
                }
                // send back the successfull response
                (0, manageCookies_1.refreshCookie)(res, refresh);
                res.status(200).json({
                    user: user,
                    access: access
                    // , refresh
                });
                return [2 /*return*/];
        }
    });
}); };
exports.default = update;
