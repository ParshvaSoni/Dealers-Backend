import joi from "joi";

export const bakiBillCreateSchema = joi.object({
    accountId: joi
        .string()
        .label("Baki Bill Account ID")
        .length(24)
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        })
        .trim()
        .required(),
    customername: joi
        .string()
        .label("Baki Bill Customer Name")
        .min(5)
        .max(30)
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        })
        .trim()
        .lowercase()
        .required(),
    customermobile: joi
        .string()
        .label("Baki Bill Customer Mobile")
        .min(10)
        .max(13)
        .regex(/^\d{10}$/)
        .messages({
            "string.pattern.base":
                `{{#label}} should contains only 10 digits`
        })
        .trim()
        .required(),
    metaltype: joi
        .string()
        .label("Baki Bill Metal Type")
        .valid("gold", "silver", "platinum","immitation")
        .required()
        .lowercase(),
    metalweight: joi
        .number()
        .label("Baki Bill Metal Weight")
        .positive()
        .min(0)
        .required(),
    metalpurity: joi
        .string()
        .label("Baki Bill Metal Purity")
        .when('metaltype', { is: "gold", then: joi.valid('18KT', '22KT', '24KT').required(), otherwise: joi.valid('100%').default("100%") })
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        })
        .required(),
    rate: joi
        .number()
        .label("Baki Bill Current Metal Rate")
        .positive()
        .min(0)
        .required(),
    labour: joi
        .number()
        .label("Baki Bill Labour Charge")
        .positive()
        .min(0)
        .required(),
    extra: joi
        .number()
        .label("Baki Bill Extra Charge")
        .positive()
        .min(0)
        .default(0),
    message: joi
        .string()
        .min(5)
        .max(250)
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        })
        .trim()
        .lowercase(),
    deliverdate: joi
        .date()
        .iso()
        .default(new Date()),
    imageurl: joi
        .string()
        .label("Baki Bill Image Url")
        .min(12)
        // .max() TBD
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    huid: joi
        .string()
        .label("Baki Bill HUID")
        .length(6)
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base":
                `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
                " '`' )",
        }),
    transaction: joi.array()
        .label("Baki Bill Transaction's")
        .items(
            {
                transactiondate: joi.date()
                    .label("Baki Bill Transaction Date")
                    .iso(),
                amount: joi.number()
                    .label("Baki Bill Transaction Amount")
                    .greater(0)
                    .positive()
                    .required(),
            }
        )
        .default([])
});