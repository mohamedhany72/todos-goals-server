import express from "express";
import users from "./users/users";
import todos from "./todos/todos";
import goals from "./goals/goals";
import accessAuth from "../utils/middlewares/accessAuth";
import isVerified from "../utils/middlewares/isVerified";

const routes = express.Router();

routes.use("/users", users);
routes.use("/todos", accessAuth, isVerified, todos);
routes.use("/goals", accessAuth, isVerified, goals);

export default routes;
