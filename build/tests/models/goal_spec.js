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
Object.defineProperty(exports, "__esModule", { value: true });
var goal_1 = require("../../models/goal");
var user_1 = require("../../models/user");
var test_utils_1 = require("../../utils/test_utils");
var userModel = new user_1.UserModel();
var model = new goal_1.GoalModel();
var goalObj = {
    id: 1,
    goal: "Master SERN stack",
    user_id: 1
};
describe("Testing Model: Goal", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, test_utils_1.resetId)();
                    // add user here
                    return [4 /*yield*/, userModel.add(test_utils_1.userObj)];
                case 1:
                    // add user here
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // remove user
                return [4 /*yield*/, userModel.delete(1)];
                case 1:
                    // remove user
                    _a.sent();
                    (0, test_utils_1.resetId)();
                    return [2 /*return*/];
            }
        });
    }); });
    // select method should exist
    it("'select' method should exist", function () {
        expect(model.select).toBeDefined();
    });
    // select method shoulg return empty array
    it("'select' method shoulg return empty array", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.select(1)];
                case 1:
                    result = _a.sent();
                    expect(result.load).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    // add method should exist
    it("'add' method should exist", function () {
        expect(model.add).toBeDefined();
    });
    // add method should return the goal
    it("'add' method should return the goal", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, load, goal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.add(goalObj)];
                case 1:
                    result = _a.sent();
                    load = result.load;
                    goal = (function (_a) {
                        var id = _a.id, goal = _a.goal, user_id = _a.user_id;
                        return ({
                            id: id,
                            goal: goal,
                            user_id: user_id
                        });
                    })(load);
                    expect(goal).toEqual(goalObj);
                    return [2 /*return*/];
            }
        });
    }); });
    // select method should select the goal
    it("'select' method should select the goal", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, load, goal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.select(1)];
                case 1:
                    result = _a.sent();
                    load = result.load;
                    goal = (function (_a) {
                        var id = _a.id, goal = _a.goal, user_id = _a.user_id;
                        return ({
                            id: id,
                            goal: goal,
                            user_id: user_id
                        });
                    })(load[0]);
                    expect(goal).toEqual(goalObj);
                    return [2 /*return*/];
            }
        });
    }); });
    // delete method should exist
    it("'delete' method should exist", function () {
        expect(model.delete).toBeDefined();
    });
    // delete method should delete the goal
    it("'delete' method should delete the goal", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model.delete(1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, model.select(1)];
                case 2:
                    result = _a.sent();
                    expect(result.load).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});
