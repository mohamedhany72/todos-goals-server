"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import csrf from "csurf";
var login_1 = __importDefault(require("./functions/login"));
var accessAuth_1 = __importDefault(require("../../utils/middlewares/accessAuth"));
var refreshAuth_1 = __importDefault(require("../../utils/middlewares/refreshAuth"));
var register_1 = __importDefault(require("./functions/register"));
var verify_1 = __importDefault(require("./functions/verify"));
var update_1 = __importDefault(require("./functions/update"));
var refresh_1 = __importDefault(require("./functions/refresh"));
var getAccess_1 = __importDefault(require("./functions/getAccess"));
var changePswd_1 = __importDefault(require("./functions/changePswd"));
var forgetPswd_1 = __importDefault(require("./functions/forgetPswd"));
var recoverPswd_1 = require("./functions/recoverPswd");
var logout_1 = __importDefault(require("./functions/logout"));
var logoutAll_1 = __importDefault(require("./functions/logoutAll"));
var delete_1 = __importDefault(require("./functions/delete"));
var browserAuth_1 = __importDefault(require("../../utils/middlewares/browserAuth"));
var sendCsrf_1 = __importDefault(require("./functions/sendCsrf"));
var sendVerify_1 = __importDefault(require("./functions/sendVerify"));
var getUser_1 = __importDefault(require("./functions/getUser"));
var formParser_1 = __importDefault(require("../../utils/middlewares/formParser"));
var csrfProtection_1 = __importDefault(require("../../utils/middlewares/csrfProtection"));
var users = express_1.default.Router();
// const csrfProtection = csrf({ cookie: true });
// login
users.post("/login", login_1.default); // done
// register
users.post("/register", register_1.default); // done
// get user
users.get("/user", accessAuth_1.default, getUser_1.default);
// verify
users.get("/verify/:verify", verify_1.default); // done
// send verify
users.get("/sendverify", accessAuth_1.default, sendVerify_1.default); //done
// csrf get
users.get("/csrf", accessAuth_1.default, sendCsrf_1.default); // done
users.put("/update", accessAuth_1.default, browserAuth_1.default, formParser_1.default, csrfProtection_1.default, update_1.default); // done
// change password post
users.put("/changepassword", accessAuth_1.default, csrfProtection_1.default, changePswd_1.default); // done
// forget password post (to send email with token)
users.post("/forgetpassword", forgetPswd_1.default); // done
// recover password get (to update password)
users.get("/recoverpassword/:code", csrfProtection_1.default, recoverPswd_1.recoverPswdGet);
// recover password put (to update password)
users.put("/recoverpassword", csrfProtection_1.default, recoverPswd_1.recoverPswdPut); // done
// refresh
users.get("/refresh", refreshAuth_1.default, browserAuth_1.default, refresh_1.default);
// generate access
users.get("/getaccess", refreshAuth_1.default, getAccess_1.default); // done
// logout
users.delete("/logout", accessAuth_1.default, browserAuth_1.default, logout_1.default); // done
// logout all browsers
users.delete("/logoutall", accessAuth_1.default, browserAuth_1.default, logoutAll_1.default);
// delete user delete
users.post("/delete", accessAuth_1.default, csrfProtection_1.default, delete_1.default);
exports.default = users;
// get users --> not in this app
