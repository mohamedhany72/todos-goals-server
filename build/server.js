"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./routes"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var allowedRequests_1 = __importDefault(require("./utils/middlewares/allowedRequests"));
// import https from "https";
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, FRONT_END_ROOT_URL = _a.FRONT_END_ROOT_URL;
var app = (0, express_1.default)();
// middleware section
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("common"));
// whitelist
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
var allowedOrigins = [
    "http://localhost:3000",
    // "http://localhost:3001",
    "https://mohamedhany72.github.io",
    "https://todos-goals-client.vercel.app"
    // FRONT_END_ROOT_URL as string
];
var options = {
    origin: allowedOrigins,
    credentials: true
};
app.use((0, cors_1.default)(options));
app.use((0, helmet_1.default)());
app.get("/", function (_req, res) {
    res.send("app running!");
});
app.use("/api", allowedRequests_1.default, routes_1.default);
app.listen(PORT, function () {
    console.log("server started at port: ".concat(PORT));
});
// https
//   .createServer(app)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
//   });
exports.default = app;
