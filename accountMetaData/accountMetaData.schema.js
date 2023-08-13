import joi from "joi";

export const accountMetaDataJoiSchema = joi.object({
    shopname: joi.string()
        .label("Account Shop Name")
        .min(5)
        .max(50)
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    tagline: joi
        .string()
        .label("Account Tagline")
        .min(5)
        .max(100)
        .lowercase()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        })
        .trim(),
    profilePicUrl: joi
        .string()
        .uri()
        .label("Account Profile Picture")
        .min(12)
        // .max() TBD
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    headerPhotoUrl: joi
        .string()
        .label("Account Header Picture URL")
        .min(12)
        .uri()
        // .max() TBD
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    footerPhotoUrl: joi
        .string()
        .label("Account Footer Picture URL")
        .min(12)
        .uri()
        // .max() TBD
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    address: joi.object({
        addressLine: joi.string()
            .label("Account Address Line")
            .min(5)
            .max(45)
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .trim()
            .messages({
                "string.pattern.invert.base":
                    `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                    " '`' )",
            }),
        city: joi.string()
            .label("Account City")
            .min(3)
            .max(30)
            .lowercase()
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .trim()
            .messages({
                "string.pattern.invert.base":
                    `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                    " '`' )",
            }),
        state: joi.string()
            .label("Account State")
            .min(3)
            .max(25)
            .lowercase()
            .required()
            .regex(/[${};<>`]/, { invert: true })
            .trim()
            .messages({
                "string.pattern.invert.base":
                    `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                    " '`' )",
            }),
        pincode: joi.string()
            .label("Account Pincode")
            .min(6)
            .max(6)
            .required()
            .regex(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/)
            .trim()
            .messages({
                "string.pattern.base":
                    `{{#label}} should contain only 6 digits with or without 1 space`,
            }),
    }),
    gstnumber: joi.string()
        .label("Account GST Number")
        .length(15)
        .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
        .trim()
        .messages({
            "string.pattern.base":
                `{{#label}} should be as per valid format.`
        }),
}).or("shopname", "tagline", "profilePicUrl", "headerPhotoUrl", "footerPhotoUrl", "address", "gstnumber");