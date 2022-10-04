import express from "express";
import csrf from "csurf";
import login from "./functions/login";
import accessAuth from "../../utils/middlewares/accessAuth";
import refreshAuth from "../../utils/middlewares/refreshAuth";
import register from "./functions/register";
import verify from "./functions/verify";
import update from "./functions/update";
import refresh from "./functions/refresh";
import getAccess from "./functions/getAccess";
import changePswd from "./functions/changePswd";
import forgetPswd from "./functions/forgetPswd";
import { recoverPswdGet, recoverPswdPut } from "./functions/recoverPswd";
import logout from "./functions/logout";
import logoutAll from "./functions/logoutAll";
import deleteUser from "./functions/delete";
import browserAuth from "../../utils/middlewares/browserAuth";
import sendcsrf from "./functions/sendCsrf";
import sendVerify from "./functions/sendVerify";
import getUser from "./functions/getUser";
import formParser from "../../utils/middlewares/formParser";

const users = express.Router();
const csrfProtection = csrf({ cookie: true });

// login
users.post("/login", login); // done

// register
users.post("/register", register); // done

// get user
users.get("/user", accessAuth, getUser);

// verify
users.get("/verify/:verify", verify); // done

// send verify
users.get("/sendverify", accessAuth, sendVerify); //done

// csrf get
users.get("/csrf", accessAuth, csrfProtection, sendcsrf); // done

users.put(
    "/update",
    accessAuth,
    browserAuth,
    formParser,
    csrfProtection,
    update
); // done

// change password post
users.put("/changepassword", accessAuth, csrfProtection, changePswd); // done

// forget password post (to send email with token)
users.post("/forgetpassword", forgetPswd); // done

// recover password get (to update password)
users.get("/recoverpassword/:code", csrfProtection, recoverPswdGet);

// recover password put (to update password)
users.put("/recoverpassword", csrfProtection, recoverPswdPut); // done

// refresh
users.get("/refresh", refreshAuth, browserAuth, refresh);

// generate access
users.get("/getaccess", refreshAuth, getAccess); // done

// logout
users.delete("/logout", accessAuth, browserAuth, logout); // done

// logout all browsers
users.delete("/logoutall", accessAuth, browserAuth, logoutAll);

// delete user delete
users.delete("/delete", accessAuth, csrfProtection, deleteUser);

export default users;

// get users --> not in this app
