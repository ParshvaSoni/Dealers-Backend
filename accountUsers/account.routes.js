import { Router } from "express";
// import { checkAccountExist,createAccount } from "./account.controllers";

import { validateBody } from "../utils/BodyValidationMiddleware.js";
import { authVerify } from "../utils/create-verify-JWT.js";
import { createUser, loginUser } from "./account.controllers.js";
import { accountRegisterSchema, accountSignInSchema } from "./account.schema.js";

const accountRouter = Router();

accountRouter.post("/create",validateBody(accountRegisterSchema),createUser);
accountRouter.post("/signin",validateBody(accountSignInSchema),loginUser);

export default accountRouter;
