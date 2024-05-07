import path from "path";
import cors from 'cors'
import  express  from 'express';

import dotenv from "dotenv";
dotenv.config();

import authRoutes from './Routes/auth.Routes.js';
import messageRoutes from './Routes/message.Routes.js';
import userRoutes from './Routes/user.Routes.js';


import connecttomongo from './db/connecttomongo.js';
import cookieParser from 'cookie-parser';

import { app ,server}  from './socket/socket.js'
const PORT=8000 || process.env.PORT;
const __dirname=path.resolve();

app.use(cors({
         origin:process.env.CORS_ORIGIN,
         credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})


server.listen(PORT,()=>{
    connecttomongo();
    console.log(`Your port is listening at port ${PORT}`);
})