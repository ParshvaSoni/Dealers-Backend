"use strict"
import mongoose from "mongoose"

const accountMongooseSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [5, "Account name should be atleast 5 character long!"],
        maxlength: [50, "Account name should be atmost 50 character long!"],
        required: [true, "Account name is required!"],
    },
    email: {
        type: String,
        minlength: [6, "Account email should be atleast 6 character long!"],
        maxlength: [350, "Account email should be atmost 350 character long!"],
        required: [true, "Account email is required!"],
    },
    mobile: {
        type: String,
        //match:[/((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/g,'Account mobile number is not in valid format!'],
        match: [/^\d{10}$/, 'Account mobile number is not in valid format!'],
        required: [true, "Account mobile number is required!"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "Account password should be atleast 5 character long!"],
        maxlength: [200, "Account password should be atmost 15 character long!"],
        required: [true, "Account password is required!"],
    }
}, {
    timestamps: true
})

accountMongooseSchema.index({ mobile: 1 })
const accountSchema = mongoose.model('Account', accountMongooseSchema);

export default accountSchema;