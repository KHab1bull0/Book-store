import { Router } from "express";
import { postUser } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post('/signup', postUser);