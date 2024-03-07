import  express  from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
const Router=express.Router();

Router.post("/login",login)


Router.post("/logout",logout);


Router.post("/signup",signUp);






export default Router;