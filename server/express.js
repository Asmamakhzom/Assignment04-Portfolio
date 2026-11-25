import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import portfolioRouter from "./portfolio-router.js";


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());


app.use("/api/portfolio", portfolioRouter);




app.get("/", (req, res) => {
    res.send("Welcome to the Portfolio API");
});







export default app;
