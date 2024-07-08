const express = require("express");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error");

const { config } = dotenv;
app.use(cors());

config({
  path: "./data/config.env",
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  return res.send("Hi abhi man");
});

// error Handling
app.use(errorMiddleware);

module.exports = app;
