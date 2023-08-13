import mongoose, { Mongoose } from "mongoose";
import accountMetaDataSchema from "./accountMetaData.db.js";

export const createAccountMetaData = async (accountId) => {
    try {
        let temp = new accountMetaDataSchema({ accountId: accountId });
        const newAccount = await temp.save();
        return {
            success: 1,
            message: "Account metaData created successfully",
            data: newAccount,
            status: 200
        }
    }
    catch (err) {
        return { success: 0, message: err.message, data: null, status: 500 };
    }
}

export const updateAccountMetaData = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.decode.id)) {
            let updatedAccountMetaData = await accountMetaDataSchema.findOneAndUpdate({ accountId: req.decode.id }, req.body);
            return res.status(200).json({ success: 1, message: "Account Metadata Updated Successfully" })
        }
        else {
            return res.status(404).json({ success: 0, message: "Unable To Update Account Metadata, Invalid Account Id" })
        }
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err.message, data: null })
    }
}

export const getMyMetaData = async (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.decode.id)) {
            let myMetaData = await accountMetaDataSchema.findOne({ accountId: req.decode.id });
            return res.status(200).json({ success: 1, message: "Account Metadata Retrieved Successfully", data: myMetaData })
        }
        else {
            return res.status(404).json({ success: 0, message: "Unable To Update Account Metadata, Invalid Account Id" })
        }
    }
    catch (err) {

    }
}