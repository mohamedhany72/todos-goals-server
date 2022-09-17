import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import https from "https";

dotenv.config();
const { PORT } = process.env;

const app = express();

// middleware section
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan("common"));

// whitelist
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));

app.use(helmet());

app.get("/", (_req: express.Request, res: express.Response): void => {
    res.send("app running!");
});

app.use("/api", routes);

app.listen(PORT, (): void => {
    console.log(`server started at port: ${PORT}`);
});

// https
//   .createServer(app)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
//   });

export default app;
