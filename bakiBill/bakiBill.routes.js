import { Router } from "express";
import { createBakiBill, getBakiBill } from "./bakiBill.controllers.js";
import { validateBody } from "../utils/BodyValidationMiddleware.js";
import { bakiBillCreateSchema } from "./bakiBill.schema.js";
import { authVerify } from "../utils/create-verify-JWT.js";

const bakiBillRouter = Router();

bakiBillRouter.post("/create", validateBody(bakiBillCreateSchema), authVerify, createBakiBill)
bakiBillRouter.get("/get", authVerify, getBakiBill);
export default bakiBillRouter;