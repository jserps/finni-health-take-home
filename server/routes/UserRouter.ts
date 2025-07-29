import { Router } from "express";
import { getUser } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/:userId", getUser);

export default userRouter;