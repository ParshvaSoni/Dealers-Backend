import mongoose from "mongoose";
import accountSchema from "../accountUsers/account.db.js";

const METAL_ENUM = ['gold', 'silver', 'platinum', 'immitation'];
const METAL_PURITY_ENUM = ['18KT', '22KT', '24KT', '100%'];

const checkAccountExist = async (id) => {
    try {
        let account = await accountSchema.findById(id);
        return account === null ? false : true;
    }
    catch (err) {
        return false;
    }
}

function greaterThanZero(val) {
    return val > 0;
}

const bakiBillSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Baki Bill Account Id Is Required"],
        validate: {
            validator: checkAccountExist,
            message: props => `No Account with ID : ${props.value} exist !`
        }
    },
    customername: {
        type: String,
        minlength: [5, "Baki bill customer name should be minimum 5 character long !"],
        maxlength: [30, "Baki bill customer name should be maximum 30 character long !"],
        required: [true, "Baki bill customer name is required !"],
    },
    customermobile: {
        type: String,
        match: [/^\d{10}$/, 'Baki bill customer mobile number is not in valid format!'],
        required: [true, "Baki bill customer mobile number is required!"],
    },
    metaltype: {
        type: String,
        enum: {
            values: METAL_ENUM,
            message: "Baki bill metal type should be one of 'Gold', 'Silver', 'Platinum' or 'Immitation' !"
        },
        required: [true, "Baki bill metal type is required !"]
    },
    metalweight: {
        type: Number,
        validate: [greaterThanZero, "Baki bill metal weight should be greater than 0 !"],
        required: [true, "Baki bill metal weight is required !"]
    },
    metalpurity: {
        type: String,
        enum: {
            values: METAL_PURITY_ENUM,
            message: "Baki bill metal purity should be one of '18KT', '22KT', '24KT', '100%' !"
        },
        required: [true, "Baki bill metal purity is required.!"]
    },
    rate: {
        type: Number,
        validate: [greaterThanZero, "Baki bill rate should be greater than 0 !"],
        required: [true, "Baki bill rate is required !"]
    },
    labour: {
        type: Number,
        validate: [greaterThanZero, "Baki bill labour should be greater than 0 !"],
        required: [true, "Baki bill labour is required !"]
    },
    extra: {
        type: Number,
        min: [0, "Baki bill extra charge cannot be less than 0 !"],
    },
    message: {
        type: String,
        mminlength: [5, "Baki bill customer name should be minimum 5 character long !"],
        maxlength: [250, "Baki bill customer name should be maximum 250 character long !"],
    },
    deliverdate: {
        type: Date,
        default: Date
    },
    imageurl: {
        type: String
    },
    huid: {
        type: String,
        minlength: [6, "Baki bill customer name should be minimum 6 character long !"],
        maxlength: [6, "Baki bill customer name should be maximum 6 character long !"],
    },
    transaction: {
        type: [{
            transactiondate: Date,
            amount: Number,
        }],
        default: []
    },

}, {
    timestamps: true
})

// for try to search keywords in order, by phonenumber
bakiBillSchema.index({ accountId: 1, customername: 'text' });

const BakiBillSchema = mongoose.model('Baki_Bill', bakiBillSchema);

export default BakiBillSchema;