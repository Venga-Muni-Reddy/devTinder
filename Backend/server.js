const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./Database");
const cors = require("cors");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user1");

const app = express();

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true,
}));
app.options('*', cors()); 


app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Start Server
connectDB()
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err.message);
    });
