import { Router } from "express";
import { getMyMetaData, updateAccountMetaData } from "./accountMetaData.controllers.js";
import { accountMetaDataJoiSchema } from "./accountMetaData.schema.js"
import { authVerify } from "../utils/create-verify-JWT.js";
import { validateBody } from "../utils/BodyValidationMiddleware.js";

const accountMetaDataRouter = Router();

accountMetaDataRouter.patch("/update", validateBody(accountMetaDataJoiSchema), authVerify, updateAccountMetaData)
accountMetaDataRouter.get("/me", authVerify, getMyMetaData)

export default accountMetaDataRouter;