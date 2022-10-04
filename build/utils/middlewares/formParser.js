"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_form_data_1 = __importDefault(require("express-form-data"));
var options = {
    uploadDir: path_1.default.join(__dirname, "..", "..", "temp"),
    autoClean: true
};
var formParser = express_form_data_1.default.parse(options);
exports.default = formParser;
