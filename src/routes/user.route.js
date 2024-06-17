import { Router } from "express";
import { postUser, verifyOtp } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post('/signup', postUser);
userRouter.post('/verify-otp', verifyOtp);