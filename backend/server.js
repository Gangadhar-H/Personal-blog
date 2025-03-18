import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"));
app.use(cookieParser());

connectDB()
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log("Error connecting DB ", e));




import userRouter from "./routes/user.route.js"
import blogRouter from './routes/blog.route.js'

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
