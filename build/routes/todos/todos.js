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
var express_1 = __importDefault(require("express"));
var todo_1 = require("../../models/todo");
var model = new todo_1.TodoModel();
var todos = express_1.default.Router();
var getTodos = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, success, load;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = res.locals.user;
                return [4 /*yield*/, model.select(user.id)];
            case 1:
                _a = _b.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    res.status(500).send("Server side Error");
                    return [2 /*return*/];
                }
                res.status(200).json({ todos: load });
                return [2 /*return*/];
        }
    });
}); };
var addTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, todo, _a, success, load;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = res.locals.user;
                todo = req.body.todo;
                return [4 /*yield*/, model.add({
                        todo: todo,
                        user_id: user.id
                    })];
            case 1:
                _a = _b.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    res.status(500).send("Server side Error");
                    return [2 /*return*/];
                }
                res.status(200).json({ todo: load });
                return [2 /*return*/];
        }
    });
}); };
var toggleTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, result, _a, success, load;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = res.locals.user;
                id = req.body.id;
                return [4 /*yield*/, model.show(id)];
            case 1:
                result = _b.sent();
                if (!result.success) {
                    res.status(404).send("Todo not found");
                    return [2 /*return*/];
                }
                // console.log((result.load as Todo).user_id)
                // check if user owns the todo
                if (user.id != result.load.user_id) {
                    res.status(401).send("user is not authorized");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model.toggle(id)];
            case 2:
                _a = _b.sent(), success = _a.success, load = _a.load;
                if (!success) {
                    res.status(500).send("Server side Error");
                    return [2 /*return*/];
                }
                res.status(200).json({ todo: load });
                return [2 /*return*/];
        }
    });
}); };
var deleteTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, result, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = res.locals.user;
                id = req.params.id;
                return [4 /*yield*/, model.show(id)];
            case 1:
                result = _a.sent();
                if (!result.success) {
                    res.status(404).send("Todo not found");
                    return [2 /*return*/];
                }
                // check if user owns the todo
                if (user.id != result.load.user_id) {
                    res.status(401).send("user is not authorized");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, model.delete(id)];
            case 2:
                success = (_a.sent()).success;
                if (!success) {
                    res.status(500).send("Server side Error");
                    return [2 /*return*/];
                }
                res.status(200).send("Todo deleted!");
                return [2 /*return*/];
        }
    });
}); };
// select all todos
todos.get("/", getTodos);
// add todo
todos.post("/", addTodo);
// toggle todo
todos.put("/", toggleTodo);
// delete todo
todos.delete("/:id", deleteTodo);
exports.default = todos;
