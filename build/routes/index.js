"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./users/users"));
var todos_1 = __importDefault(require("./todos/todos"));
var goals_1 = __importDefault(require("./goals/goals"));
var accessAuth_1 = __importDefault(require("../utils/middlewares/accessAuth"));
var isVerified_1 = __importDefault(require("../utils/middlewares/isVerified"));
var path_1 = __importDefault(require("path"));
var routes = express_1.default.Router();
routes.use("/users", users_1.default);
routes.use("/todos", accessAuth_1.default, isVerified_1.default, todos_1.default);
routes.use("/goals", accessAuth_1.default, isVerified_1.default, goals_1.default);
routes.use("/images", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
exports.default = routes;
