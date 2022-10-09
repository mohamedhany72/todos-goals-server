import express from "express";
import users from "./users/users";
import todos from "./todos/todos";
import goals from "./goals/goals";
import accessAuth from "../utils/middlewares/accessAuth";
import isVerified from "../utils/middlewares/isVerified";
import path from "path";

const routes = express.Router();

routes.use("/users", users);
routes.use("/todos", accessAuth, isVerified, todos);
routes.use("/goals", accessAuth, isVerified, goals);
routes.use(
    "/images",
    express.static(path.join(__dirname, "..", "..", "uploads"))
);

export default routes;
