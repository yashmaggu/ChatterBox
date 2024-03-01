import  express  from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";
const Router=express.Router();

Router.get("/login",login)


Router.get("/logout",logout);


Router.get("/signup",signUp);






export default Router;