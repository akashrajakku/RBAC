import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import adminRouter from "./routes/adminRoutes.js"
import managerRouter from "./routes/managerRoutes/managerRoutes.js"
import employeeRouter from "./routes/employeeRoutes/employeeRoutes.js"
import usersRouter from "./routes/userRoutes/usersRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.VITE_URL,
    credentials:true,
}));

app.use("/api/v1" , adminRouter);
app.use("/api/v1/manager" , managerRouter);
app.use("/api/v1/employee" , employeeRouter);
app.use("/api/v1/users", usersRouter);

app.get('/', (req, res)=>{
    res.json({
        message: "server's up"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("server running on 8000");
    connectDB();
})