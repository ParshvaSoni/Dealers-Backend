"use strict"
import mongoose from "mongoose"

const accountMetaDataMongooseSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account ID is required!"],
    },
    shopname: {
        type: String,
        minlength: [5, "Account shopname should be atleast 5 character long!"],
        maxlength: [50, "Account shopname should be atmost 50 character long!"],
        // required: [true, "Account shopname is required!"],
    },
    tagline: {
        type: String,
        minlength: [5, "Account shopname should be atleast 5 character long!"],
        maxlength: [100, "Account shopname should be atmost 50 character long!"],
    },
    profilePicUrl: {
        type: String,
        // required: [true, "Account Profile Picture URL is required!"],
    },
    headerPhotoUrl: {
        type: String,
        // required: [true, "Account Header Picture URL is required!"],
    },
    footerPhotoUrl: {
        type: String,
        // required: [true, "Account Footer Picture URL is required!"],
    },
    address: {
        addressLine: {
            type: String,
            minlength: [5, "Account location address line should be atleast 5 character long!"],
            maxlength: [45, "Account location address line should be atmost 45 character long!"],
            // required: [true, "Account location address line is required!"]
        },
        city: {
            type: String,
            minlength: [3, "Account location city should be atleast 3 character long!"],
            maxlength: [30, "Account location city should be atmost 30 character long!"],
            // required: [true, "Account location city is required!"]
        },
        state: {
            type: String,
            minlength: [3, "Account location state should be atleast 3 character long!"],
            maxlength: [25, "Account location state should be atmost 25 character long!"],
            // required: [true, "Account location state is required!"]
        },
        pincode: {
            type: String,
            match: [/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/, 'Account pincode should contain only 6 digits with or without 1 space!'],
            minlength: [6, "Account location pincode should be atleast 6 character long!"],
            maxlength: [6, "Account location pincode should be atmost 6 character long!"],
            // required: [true, "Account location pincode is required!"]
        },
    },
    gstnumber: {
        type: String,
        minlength: [15, "Account GST number should be atleast 15 character long!"],
        maxlength: [15, "Account GST number should be atmost 15 character long!"],
        // required: [true, "Account GST number is required!"]
    }
}, {
    timestamps: true
})

accountMetaDataMongooseSchema.index({ accountId: 1 })
const accountMetaDataSchema = mongoose.model('AccountMetaData', accountMetaDataMongooseSchema);

export default accountMetaDataSchema;