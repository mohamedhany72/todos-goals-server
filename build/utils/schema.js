"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var password_validator_1 = __importDefault(require("password-validator"));
var schema = new password_validator_1.default();
schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(16) // Maximum length 16
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols() // Must have symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
exports.default = schema;
