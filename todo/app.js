import cookieParser from "cookie-parser";
import express from "express";
import db from "./models/index.js";
import User from "./routes/user.js";
import Todo from "./routes/todo.js";
import cors from "cors";
const app = express();
db.sequelize.sync().then(() => {
    console.log("연결 성공");
});
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3000"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", User);
app.use("/todo", Todo);
app.listen(3030, () => {
    console.log("start server port: 3030");
});
