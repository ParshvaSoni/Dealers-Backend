import joi from "joi";

export const accountRegisterSchema = joi.object({
  username: joi
    .string()
    .label("Account Username")
    .min(5)
    .max(50)
    .required()
    .regex(/[${};<>`]/, { invert: true })
    .trim()
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    }),
  email: joi
    .string()
    .label("Account Email")
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .lowercase()
    .trim(),
  mobile: joi
    .string()
    .label("Account Mobile Number")
    .min(8)
    .max(13)
    .lowercase()
    .required()
    .regex(/^\d{10}$/)
    //.regex(/[^\d{8,13}$]/)
    .trim()
    // .pattern(/^\+\d+$/)
    .messages({
      "string.pattern.base":
        `{{#label}} should only contains 10 digits`,
    }),
  password: joi
    .string()
    .label("Account Password")
    .min(8)
    .max(15)
    
});

export const accountSignInSchema = joi.object({
  mobile: joi
    .string()
    .label("Account Mobile Number")
    .min(8)
    .max(13)
    .lowercase()
    .required()
    .regex(/^\d{10}$/)
    //.regex(/[^\d{8,13}$]/)
    .trim()
    // .pattern(/^\+\d+$/)
    .messages({
      "string.pattern.base":
        `{{#label}} should only contains 10 digits`,
    }),
  password: joi
    .string()
    .label("Account Password")
    .min(8)
    .max(15)
});